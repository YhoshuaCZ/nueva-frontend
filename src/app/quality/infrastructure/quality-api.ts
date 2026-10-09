import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {QualityDocument} from '../domain/model/quality-document.entity';
import {QualityDocumentsApiEndpoint} from './quality-documents-api-endpoint';
import {Deviation} from '../domain/model/deviation.entity';
import {DeviationsApiEndpoint} from './deviations-api-endpoint';
import {Evidence} from '../domain/model/evidence.entity';
import {EvidenceApiEndpoint} from './evidence-api-endpoint';
import {CapaPlan} from '../domain/model/capa-plan.entity';
import {CapaPlansApiEndpoint} from './capa-plans-api-endpoint';
import {CapaAction} from '../domain/model/capa-action.entity';
import {CapaActionsApiEndpoint} from './capa-actions-api-endpoint';
import {AnalyticalResult} from '../domain/model/analytical-result.entity';
import {AnalyticalResultsApiEndpoint} from './analytical-results-api-endpoint';
import {Audit} from '../domain/model/audit.entity';
import {AuditsApiEndpoint} from './audits-api-endpoint';
import {AuditFinding} from '../domain/model/audit-finding.entity';
import {AuditFindingsApiEndpoint} from './audit-findings-api-endpoint';
import {AuditEvent} from '../domain/model/audit-event.entity';
import {AuditEventsApiEndpoint} from './audit-events-api-endpoint';
import {RegulatoryReport} from '../domain/model/regulatory-report.entity';
import {RegulatoryReportsApiEndpoint} from './regulatory-reports-api-endpoint';
import {CollaborationTask} from '../domain/model/collaboration-task.entity';
import {CollaborationTasksApiEndpoint} from './collaboration-tasks-api-endpoint';
import {TaskComment} from '../domain/model/task-comment.entity';
import {TaskCommentsApiEndpoint} from './task-comments-api-endpoint';
import {TraceabilityGap} from '../domain/model/traceability-gap.entity';
import {TraceabilityGapsApiEndpoint} from './traceability-gaps-api-endpoint';
import {DeviationTrend} from '../domain/model/deviation-trend.entity';
import {DeviationTrendsApiEndpoint} from './deviation-trends-api-endpoint';

/**
 * Infrastructure facade for the Quality & Compliance endpoints.
 */
@Injectable({providedIn: 'root'})
export class QualityApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly qualityDocumentsEndpoint = new QualityDocumentsApiEndpoint(this.http);
  private readonly deviationsEndpoint = new DeviationsApiEndpoint(this.http);
  private readonly evidenceEndpoint = new EvidenceApiEndpoint(this.http);
  private readonly capaPlansEndpoint = new CapaPlansApiEndpoint(this.http);
  private readonly capaActionsEndpoint = new CapaActionsApiEndpoint(this.http);
  private readonly analyticalResultsEndpoint = new AnalyticalResultsApiEndpoint(this.http);
  private readonly auditsEndpoint = new AuditsApiEndpoint(this.http);
  private readonly auditFindingsEndpoint = new AuditFindingsApiEndpoint(this.http);
  private readonly auditEventsEndpoint = new AuditEventsApiEndpoint(this.http);
  private readonly regulatoryReportsEndpoint = new RegulatoryReportsApiEndpoint(this.http);
  private readonly collaborationTasksEndpoint = new CollaborationTasksApiEndpoint(this.http);
  private readonly taskCommentsEndpoint = new TaskCommentsApiEndpoint(this.http);
  private readonly traceabilityGapsEndpoint = new TraceabilityGapsApiEndpoint(this.http);
  private readonly deviationTrendsEndpoint = new DeviationTrendsApiEndpoint(this.http);

  /** Retrieves all quality document records. */
  getQualityDocuments = (): Observable<QualityDocument[]> => this.qualityDocumentsEndpoint.getAll();

  /** Creates a quality document. */
  createQualityDocument = (item: QualityDocument): Observable<QualityDocument> => this.qualityDocumentsEndpoint.create(item);

  /** Updates a quality document. */
  updateQualityDocument = (item: QualityDocument): Observable<QualityDocument> => this.qualityDocumentsEndpoint.update(item, item.id);

  /** Retrieves all deviation records. */
  getDeviations = (): Observable<Deviation[]> => this.deviationsEndpoint.getAll();

  /** Creates a deviation. */
  createDeviation = (item: Deviation): Observable<Deviation> => this.deviationsEndpoint.create(item);

  /** Updates a deviation. */
  updateDeviation = (item: Deviation): Observable<Deviation> => this.deviationsEndpoint.update(item, item.id);

  /** Retrieves all evidence records. */
  getEvidence = (): Observable<Evidence[]> => this.evidenceEndpoint.getAll();

  /** Creates a evidence. */
  createEvidence = (item: Evidence): Observable<Evidence> => this.evidenceEndpoint.create(item);

  /** Updates a evidence. */
  updateEvidence = (item: Evidence): Observable<Evidence> => this.evidenceEndpoint.update(item, item.id);

  /** Retrieves all CAPA plan records. */
  getCapaPlans = (): Observable<CapaPlan[]> => this.capaPlansEndpoint.getAll();

  /** Creates a CAPA plan. */
  createCapaPlan = (item: CapaPlan): Observable<CapaPlan> => this.capaPlansEndpoint.create(item);

  /** Updates a CAPA plan. */
  updateCapaPlan = (item: CapaPlan): Observable<CapaPlan> => this.capaPlansEndpoint.update(item, item.id);

  /** Retrieves all CAPA action records. */
  getCapaActions = (): Observable<CapaAction[]> => this.capaActionsEndpoint.getAll();

  /** Creates a CAPA action. */
  createCapaAction = (item: CapaAction): Observable<CapaAction> => this.capaActionsEndpoint.create(item);

  /** Updates a CAPA action. */
  updateCapaAction = (item: CapaAction): Observable<CapaAction> => this.capaActionsEndpoint.update(item, item.id);

  /** Retrieves all analytical result records. */
  getAnalyticalResults = (): Observable<AnalyticalResult[]> => this.analyticalResultsEndpoint.getAll();

  /** Creates a analytical result. */
  createAnalyticalResult = (item: AnalyticalResult): Observable<AnalyticalResult> => this.analyticalResultsEndpoint.create(item);

  /** Updates a analytical result. */
  updateAnalyticalResult = (item: AnalyticalResult): Observable<AnalyticalResult> => this.analyticalResultsEndpoint.update(item, item.id);

  /** Retrieves all audit records. */
  getAudits = (): Observable<Audit[]> => this.auditsEndpoint.getAll();

  /** Creates a audit. */
  createAudit = (item: Audit): Observable<Audit> => this.auditsEndpoint.create(item);

  /** Updates a audit. */
  updateAudit = (item: Audit): Observable<Audit> => this.auditsEndpoint.update(item, item.id);

  /** Retrieves all audit finding records. */
  getAuditFindings = (): Observable<AuditFinding[]> => this.auditFindingsEndpoint.getAll();

  /** Creates a audit finding. */
  createAuditFinding = (item: AuditFinding): Observable<AuditFinding> => this.auditFindingsEndpoint.create(item);

  /** Updates a audit finding. */
  updateAuditFinding = (item: AuditFinding): Observable<AuditFinding> => this.auditFindingsEndpoint.update(item, item.id);

  /** Retrieves all audit event records. */
  getAuditEvents = (): Observable<AuditEvent[]> => this.auditEventsEndpoint.getAll();

  /** Creates a audit event. */
  createAuditEvent = (item: AuditEvent): Observable<AuditEvent> => this.auditEventsEndpoint.create(item);

  /** Updates a audit event. */
  updateAuditEvent = (item: AuditEvent): Observable<AuditEvent> => this.auditEventsEndpoint.update(item, item.id);

  /** Retrieves all regulatory report records. */
  getRegulatoryReports = (): Observable<RegulatoryReport[]> => this.regulatoryReportsEndpoint.getAll();

  /** Creates a regulatory report. */
  createRegulatoryReport = (item: RegulatoryReport): Observable<RegulatoryReport> => this.regulatoryReportsEndpoint.create(item);

  /** Updates a regulatory report. */
  updateRegulatoryReport = (item: RegulatoryReport): Observable<RegulatoryReport> => this.regulatoryReportsEndpoint.update(item, item.id);

  /** Retrieves all task records. */
  getCollaborationTasks = (): Observable<CollaborationTask[]> => this.collaborationTasksEndpoint.getAll();

  /** Creates a task. */
  createCollaborationTask = (item: CollaborationTask): Observable<CollaborationTask> => this.collaborationTasksEndpoint.create(item);

  /** Updates a task. */
  updateCollaborationTask = (item: CollaborationTask): Observable<CollaborationTask> => this.collaborationTasksEndpoint.update(item, item.id);

  /** Retrieves all comment records. */
  getTaskComments = (): Observable<TaskComment[]> => this.taskCommentsEndpoint.getAll();

  /** Creates a comment. */
  createTaskComment = (item: TaskComment): Observable<TaskComment> => this.taskCommentsEndpoint.create(item);

  /** Updates a comment. */
  updateTaskComment = (item: TaskComment): Observable<TaskComment> => this.taskCommentsEndpoint.update(item, item.id);

  /** Retrieves all traceability gap records. */
  getTraceabilityGaps = (): Observable<TraceabilityGap[]> => this.traceabilityGapsEndpoint.getAll();

  /** Creates a traceability gap. */
  createTraceabilityGap = (item: TraceabilityGap): Observable<TraceabilityGap> => this.traceabilityGapsEndpoint.create(item);

  /** Updates a traceability gap. */
  updateTraceabilityGap = (item: TraceabilityGap): Observable<TraceabilityGap> => this.traceabilityGapsEndpoint.update(item, item.id);

  /** Retrieves all deviation trend records. */
  getDeviationTrends = (): Observable<DeviationTrend[]> => this.deviationTrendsEndpoint.getAll();

  /** Creates a deviation trend. */
  createDeviationTrend = (item: DeviationTrend): Observable<DeviationTrend> => this.deviationTrendsEndpoint.create(item);

  /** Updates a deviation trend. */
  updateDeviationTrend = (item: DeviationTrend): Observable<DeviationTrend> => this.deviationTrendsEndpoint.update(item, item.id);
}
