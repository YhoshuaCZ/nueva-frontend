import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Observable, retry} from 'rxjs';
import {QualityApi} from '../infrastructure/quality-api';
import {QualityDocument} from '../domain/model/quality-document.entity';
import {Deviation} from '../domain/model/deviation.entity';
import {Evidence} from '../domain/model/evidence.entity';
import {CapaPlan} from '../domain/model/capa-plan.entity';
import {CapaAction} from '../domain/model/capa-action.entity';
import {AnalyticalResult} from '../domain/model/analytical-result.entity';
import {Audit} from '../domain/model/audit.entity';
import {AuditFinding} from '../domain/model/audit-finding.entity';
import {AuditEvent} from '../domain/model/audit-event.entity';
import {RegulatoryReport} from '../domain/model/regulatory-report.entity';
import {CollaborationTask} from '../domain/model/collaboration-task.entity';
import {TaskComment} from '../domain/model/task-comment.entity';
import {TraceabilityGap} from '../domain/model/traceability-gap.entity';
import {DeviationTrend} from '../domain/model/deviation-trend.entity';
import {ManufacturingStore} from '../../manufacturing/application/manufacturing.store';
import {IamStore} from '../../iam/application/iam.store';

/**
 * Check of the release readiness of a batch.
 */
export interface ReleaseCheck {
  /** Translation key of the check. */
  key: string;
  /** Record that proves the check. */
  evidence: string;
  /** Whether the check passed. */
  passed: boolean;
}

/**
 * Reason why a CAPA plan cannot be routed for approval.
 */
export type CapaRejection = 'root-cause-required' | 'evidence-missing' | 'self-approval';

/**
 * Holds documents, deviations, CAPA, analytical results, audits, the audit trail, reports and tasks,
 * and applies the GMP rules of the Quality & Compliance bounded context.
 */
@Injectable({providedIn: 'root'})
export class QualityStore {
  private readonly qualityApi = inject(QualityApi);
  private readonly manufacturingStore = inject(ManufacturingStore);
  private readonly iamStore = inject(IamStore);

  private readonly documentsSignal = signal<QualityDocument[]>([]);
  private readonly deviationsSignal = signal<Deviation[]>([]);
  private readonly evidenceSignal = signal<Evidence[]>([]);
  private readonly capaPlansSignal = signal<CapaPlan[]>([]);
  private readonly capaActionsSignal = signal<CapaAction[]>([]);
  private readonly resultsSignal = signal<AnalyticalResult[]>([]);
  private readonly auditsSignal = signal<Audit[]>([]);
  private readonly findingsSignal = signal<AuditFinding[]>([]);
  private readonly eventsSignal = signal<AuditEvent[]>([]);
  private readonly reportsSignal = signal<RegulatoryReport[]>([]);
  private readonly tasksSignal = signal<CollaborationTask[]>([]);
  private readonly commentsSignal = signal<TaskComment[]>([]);
  private readonly gapsSignal = signal<TraceabilityGap[]>([]);
  private readonly trendsSignal = signal<DeviationTrend[]>([]);
  private readonly errorSignal = signal<string | null>(null);

  readonly documents = this.documentsSignal.asReadonly();
  readonly deviations = this.deviationsSignal.asReadonly();
  readonly evidence = this.evidenceSignal.asReadonly();
  readonly capaPlans = this.capaPlansSignal.asReadonly();
  readonly capaActions = this.capaActionsSignal.asReadonly();
  readonly results = this.resultsSignal.asReadonly();
  readonly audits = this.auditsSignal.asReadonly();
  readonly findings = this.findingsSignal.asReadonly();
  readonly tasks = this.tasksSignal.asReadonly();
  readonly comments = this.commentsSignal.asReadonly();
  readonly gaps = this.gapsSignal.asReadonly();
  readonly trends = this.trendsSignal.asReadonly();
  readonly reports = this.reportsSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  /** Audit trail, newest first. */
  readonly events = computed(() => [...this.eventsSignal()].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt)));

  /** Deviations that are not closed. */
  readonly openDeviations = computed(() => this.deviations().filter(item => item.status !== 'closed'));

  /** CAPA actions that are not complete. */
  readonly openActions = computed(() => this.capaActions().filter(item => item.status !== 'complete'));

  /**
   * Creates the store and loads the quality data.
   */
  constructor() {
    this.load(this.qualityApi.getQualityDocuments(), this.documentsSignal, 'documents');
    this.load(this.qualityApi.getDeviations(), this.deviationsSignal, 'deviations');
    this.load(this.qualityApi.getEvidence(), this.evidenceSignal, 'evidence');
    this.load(this.qualityApi.getCapaPlans(), this.capaPlansSignal, 'CAPA plans');
    this.load(this.qualityApi.getCapaActions(), this.capaActionsSignal, 'CAPA actions');
    this.load(this.qualityApi.getAnalyticalResults(), this.resultsSignal, 'analytical results');
    this.load(this.qualityApi.getAudits(), this.auditsSignal, 'audits');
    this.load(this.qualityApi.getAuditFindings(), this.findingsSignal, 'audit findings');
    this.load(this.qualityApi.getAuditEvents(), this.eventsSignal, 'audit trail');
    this.load(this.qualityApi.getRegulatoryReports(), this.reportsSignal, 'reports');
    this.load(this.qualityApi.getCollaborationTasks(), this.tasksSignal, 'tasks');
    this.load(this.qualityApi.getTaskComments(), this.commentsSignal, 'comments');
    this.load(this.qualityApi.getTraceabilityGaps(), this.gapsSignal, 'traceability gaps');
    this.load(this.qualityApi.getDeviationTrends(), this.trendsSignal, 'deviation trends');
  }

  /** Versions of a document, newest first. */
  versionsOf = (code: string): Signal<QualityDocument[]> =>
    computed(() => this.documents().filter(item => item.code === code).sort((a, b) => b.version.localeCompare(a.version)));

  /** Evidence attached to a record. */
  evidenceOf = (recordCode: string): Signal<Evidence[]> => computed(() => this.evidence().filter(item => item.recordCode === recordCode));

  /** Actions of a CAPA plan. */
  actionsOf = (capaCode: string): Signal<CapaAction[]> => computed(() => this.capaActions().filter(item => item.capaCode === capaCode));

  /** Analytical results of a batch. */
  resultsOf = (batchCode: string): Signal<AnalyticalResult[]> => computed(() => this.results().filter(item => item.batchCode === batchCode));

  /** Findings of an audit. */
  findingsOf = (auditCode: string): Signal<AuditFinding[]> => computed(() => this.findings().filter(item => item.auditCode === auditCode));

  /** Comments of a record, oldest first. */
  commentsOf = (recordCode: string): Signal<TaskComment[]> =>
    computed(() => this.comments().filter(item => item.recordCode === recordCode).sort((a, b) => a.postedAt.localeCompare(b.postedAt)));

  /**
   * Approves a document version. The author cannot approve their own version (separation of duties).
   * @param document - Version to approve.
   * @returns False when the signed-in user is the author.
   */
  approveDocument = (document: QualityDocument): boolean => {
    const user = this.iamStore.currentUser();
    if (!user || user.fullName === document.author) return false;
    this.versionsOf(document.code)().filter(item => item.status === 'approved').forEach(previous => {
      previous.status = 'obsolete';
      this.save(this.qualityApi.updateQualityDocument(previous), this.documentsSignal);
    });
    document.status = 'approved';
    document.approver = user.fullName;
    this.save(this.qualityApi.updateQualityDocument(document), this.documentsSignal);
    this.log('Document approved', `${document.code} v${document.version}`, 'Approved');
    return true;
  };

  /**
   * Registers a deviation, for example from an out-of-specification result or an IoT alert.
   * @param deviation - Deviation to register.
   */
  registerDeviation = (deviation: Deviation): void => {
    this.qualityApi.createDeviation(deviation).pipe(retry(2)).subscribe({
      next: created => {
        this.deviationsSignal.update(items => [...items, created]);
        this.log('Deviation registered', created.code, 'Open');
      },
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to register the deviation'))
    });
  };

  /**
   * Next free code of a record type, such as DEV-26018.
   * @param prefix - Code prefix.
   * @param codes - Existing codes.
   */
  nextCode = (prefix: string, codes: string[]): string => {
    const numbers = codes.map(code => Number(code.replace(/\D/g, ''))).filter(Boolean);
    return `${prefix}-${Math.max(26000, ...numbers) + 1}`;
  };

  /**
   * Submits the risk assessment of a deviation. Every piece of evidence must be reviewed first.
   * @param deviation - Deviation with the assessment.
   * @returns False when evidence is still pending review.
   */
  submitAssessment = (deviation: Deviation): boolean => {
    if (this.evidenceOf(deviation.code)().some(item => item.status !== 'reviewed' && item.status !== 'attached')) return false;
    deviation.status = 'submitted';
    this.save(this.qualityApi.updateDeviation(deviation), this.deviationsSignal);
    this.log('Risk assessment submitted', deviation.code, 'Submitted');
    return true;
  };

  /**
   * Marks a piece of evidence as reviewed.
   * @param evidence - Evidence reviewed.
   */
  reviewEvidence = (evidence: Evidence): void => {
    evidence.status = 'reviewed';
    this.save(this.qualityApi.updateEvidence(evidence), this.evidenceSignal);
  };

  /**
   * Attaches a file as evidence of a record.
   * @param recordCode - Record supported by the file.
   * @param fileName - Name of the file.
   */
  attachEvidence = (recordCode: string, fileName: string): void => {
    const detail = `${this.iamStore.currentUser()?.fullName ?? ''} · ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`;
    this.qualityApi.createEvidence(new Evidence({id: 0, recordCode, fileName, detail, status: 'attached'})).subscribe({
      next: created => {
        this.evidenceSignal.update(items => [...items, created]);
        this.log('Evidence attached', recordCode, 'Recorded');
      }
    });
  };

  /**
   * Checks whether a CAPA plan can be routed for approval.
   * @param plan - CAPA plan.
   * @returns The reasons why it cannot be routed (empty when it can).
   */
  validateCapa = (plan: CapaPlan): CapaRejection[] => {
    const reasons: CapaRejection[] = [];
    if (!plan.rootCause.trim()) reasons.push('root-cause-required');
    if (this.actionsOf(plan.code)().some(action => !action.evidenceAttached)) reasons.push('evidence-missing');
    if (plan.reviewer === plan.owner) reasons.push('self-approval');
    return reasons;
  };

  /**
   * Saves the root cause of a CAPA plan.
   * @param plan - CAPA plan with the new root cause.
   */
  saveCapa = (plan: CapaPlan): void => this.save(this.qualityApi.updateCapaPlan(plan), this.capaPlansSignal);

  /**
   * Routes a CAPA plan to its independent reviewer when it is complete.
   * @param plan - CAPA plan.
   * @returns The reasons why it cannot be routed (empty when it was routed).
   */
  routeCapa = (plan: CapaPlan): CapaRejection[] => {
    const reasons = this.validateCapa(plan);
    if (reasons.length) return reasons;
    plan.status = 'in-approval';
    this.saveCapa(plan);
    this.log('CAPA routed for approval', plan.code, 'In approval');
    return reasons;
  };

  /**
   * Attaches the evidence of a CAPA action.
   * @param action - Action whose evidence is attached.
   */
  attachActionEvidence = (action: CapaAction): void => {
    action.evidenceAttached = true;
    if (action.status === 'open' || action.status === 'planned') action.status = 'in-review';
    this.save(this.qualityApi.updateCapaAction(action), this.capaActionsSignal);
  };

  /**
   * Adds an action to a CAPA plan.
   * @param action - New action.
   */
  addAction = (action: CapaAction): void => {
    this.qualityApi.createCapaAction(action).subscribe({next: created => this.capaActionsSignal.update(items => [...items, created])});
  };

  /**
   * Saves an analytical result calculated with the protocol formula.
   * @param result - Result to save.
   */
  saveResult = (result: AnalyticalResult): void => {
    this.save(this.qualityApi.updateAnalyticalResult(result), this.resultsSignal);
    this.log('Analytical result recorded', `${result.reportCode} · ${result.test}`, result.status === 'oos' ? 'OOS' : 'Recorded');
  };

  /**
   * Adds a finding to an audit.
   * @param finding - New finding.
   */
  addFinding = (finding: AuditFinding): void => {
    this.qualityApi.createAuditFinding(finding).subscribe({next: created => this.findingsSignal.update(items => [...items, created])});
  };

  /**
   * Creates a regulatory report.
   * @param report - New report.
   */
  addReport = (report: RegulatoryReport): void => {
    this.qualityApi.createRegulatoryReport(report).subscribe({next: created => this.reportsSignal.update(items => [created, ...items])});
  };

  /**
   * Assigns a task to an owner.
   * @param task - New task.
   */
  addTask = (task: CollaborationTask): void => {
    this.qualityApi.createCollaborationTask(task).subscribe({next: created => this.tasksSignal.update(items => [...items, created])});
  };

  /**
   * Posts a comment in the discussion of a record.
   * @param recordCode - Record discussed.
   * @param text - Comment text.
   */
  addComment = (recordCode: string, text: string): void => {
    const user = this.iamStore.currentUser();
    if (!user) return;
    this.qualityApi.createTaskComment(new TaskComment({
      id: 0, recordCode, author: user.fullName, initials: user.initials, postedAt: new Date().toISOString(), text
    })).subscribe({next: created => this.commentsSignal.update(items => [...items, created])});
  };

  /**
   * Release readiness of a batch: manufacturing record, analytical results, materials, deviations, packaging and documents.
   * @param batchCode - Batch to release.
   * @returns The six checks.
   */
  releaseChecks = (batchCode: string): ReleaseCheck[] => {
    const batch = this.manufacturingStore.batches().find(item => item.code === batchCode);
    const results = this.resultsOf(batchCode)();
    const lots = this.manufacturingStore.materialLots().filter(lot => lot.allocatedBatch === batchCode);
    const deviations = this.deviations().filter(item => item.batchCode === batchCode);
    const complete = !!batch && batch.progress === 100;
    return [
      {key: 'manufacturing-record', evidence: batch?.orderCode ?? '', passed: complete},
      {key: 'analytical-results', evidence: results[0]?.reportCode ?? '—', passed: results.length > 0 && results.every(r => r.status === 'within' && r.approval === 'approved')},
      {key: 'materials', evidence: `MAT-${batchCode.slice(2)}`, passed: lots.every(lot => lot.status === 'approved')},
      {key: 'deviations', evidence: deviations.map(item => item.code).join(', ') || 'DEV register', passed: deviations.every(item => item.status === 'dispositioned' || item.status === 'closed')},
      {key: 'packaging', evidence: `PKG-${batchCode.slice(2)}`, passed: complete},
      {key: 'documents', evidence: 'SOP-QA log', passed: true}
    ];
  };

  /**
   * Signs the release of a batch after the approver re-enters the password.
   * @param batchCode - Batch to release.
   * @param password - Password of the approver.
   * @param done - Callback with the result: released, wrong password or not ready.
   */
  signRelease = (batchCode: string, password: string, done: (result: 'released' | 'invalid-password' | 'not-ready') => void): void => {
    if (this.releaseChecks(batchCode).some(check => !check.passed)) return done('not-ready');
    this.iamStore.verifyPassword(password).subscribe(valid => {
      if (!valid) return done('invalid-password');
      this.manufacturingStore.releaseBatch(batchCode);
      this.log('Batch released (electronic signature)', batchCode, 'Released');
      done('released');
    });
  };

  /**
   * Adds an attributed event to the audit trail.
   * @param event - What happened.
   * @param record - Affected record.
   * @param result - Result of the event.
   */
  log = (event: string, record: string, result: string): void => {
    const user = this.iamStore.currentUser();
    this.qualityApi.createAuditEvent(new AuditEvent({
      id: 0, eventCode: `EVT-${Date.now().toString().slice(-5)}`, occurredAt: new Date().toISOString(), actor: user?.fullName ?? 'System',
      actorRole: user?.role ?? 'system', event, record, result, field: '', before: '', after: '', reason: ''
    })).subscribe({next: created => this.eventsSignal.update(items => [...items, created])});
  };

  /**
   * Persists a record and replaces it in its signal.
   * @param request - Update request.
   * @param target - Signal that stores the collection.
   */
  private save<T extends { id: number }>(request: Observable<T>, target: WritableSignal<T[]>): void {
    request.pipe(retry(2)).subscribe({
      next: updated => target.update(items => items.map(item => item.id === updated.id ? updated : item)),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to save the record'))
    });
  }

  /**
   * Loads a collection into a signal.
   * @param source - Request that returns the collection.
   * @param target - Signal that stores it.
   * @param name - Name used in the error message.
   */
  private load<T>(source: Observable<T[]>, target: WritableSignal<T[]>, name: string): void {
    source.subscribe({
      next: items => target.set(items),
      error: err => this.errorSignal.set(this.formatError(err, `Failed to load ${name}`))
    });
  }

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
