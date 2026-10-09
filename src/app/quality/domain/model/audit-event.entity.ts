import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an immutable, attributed event of the audit trail.
 */
export class AuditEvent implements BaseEntity {
  /**
   * Unique identifier of the audit event.
   */
  #id: number;

  /**
   * Event identifier, such as EVT-89412.
   */
  #eventCode: string;

  /**
   * When it happened (ISO 8601, UTC).
   */
  #occurredAt: string;

  /**
   * Who or what performed it.
   */
  #actor: string;

  /**
   * Role of the actor.
   */
  #actorRole: string;

  /**
   * What happened.
   */
  #event: string;

  /**
   * Affected record.
   */
  #record: string;

  /**
   * Result of the event.
   */
  #result: string;

  /**
   * Changed field, if any.
   */
  #field: string;

  /**
   * Value before the change.
   */
  #before: string;

  /**
   * Value after the change.
   */
  #after: string;

  /**
   * Reason of the change.
   */
  #reason: string;

  /**
   * Creates a new audit event.
   * @param auditEvent - Initial values of the audit event.
   */
  constructor(auditEvent: { id: number; eventCode: string; occurredAt: string; actor: string; actorRole: string; event: string; record: string; result: string; field: string; before: string; after: string; reason: string }) {
    this.#id = auditEvent.id;
    this.#eventCode = auditEvent.eventCode;
    this.#occurredAt = auditEvent.occurredAt;
    this.#actor = auditEvent.actor;
    this.#actorRole = auditEvent.actorRole;
    this.#event = auditEvent.event;
    this.#record = auditEvent.record;
    this.#result = auditEvent.result;
    this.#field = auditEvent.field;
    this.#before = auditEvent.before;
    this.#after = auditEvent.after;
    this.#reason = auditEvent.reason;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get eventCode(): string { return this.#eventCode; }
  set eventCode(value: string) { this.#eventCode = value; }

  get occurredAt(): string { return this.#occurredAt; }
  set occurredAt(value: string) { this.#occurredAt = value; }

  get actor(): string { return this.#actor; }
  set actor(value: string) { this.#actor = value; }

  get actorRole(): string { return this.#actorRole; }
  set actorRole(value: string) { this.#actorRole = value; }

  get event(): string { return this.#event; }
  set event(value: string) { this.#event = value; }

  get record(): string { return this.#record; }
  set record(value: string) { this.#record = value; }

  get result(): string { return this.#result; }
  set result(value: string) { this.#result = value; }

  get field(): string { return this.#field; }
  set field(value: string) { this.#field = value; }

  get before(): string { return this.#before; }
  set before(value: string) { this.#before = value; }

  get after(): string { return this.#after; }
  set after(value: string) { this.#after = value; }

  get reason(): string { return this.#reason; }
  set reason(value: string) { this.#reason = value; }
}
