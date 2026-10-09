import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an invitation sent by the administrator to join the organization.
 */
export class Invitation implements BaseEntity {
  /**
   * Unique identifier of the invitation.
   */
  #id: number;

  /**
   * Full name of the invited person.
   */
  #fullName: string;

  /**
   * Work email that receives the invitation.
   */
  #email: string;

  /**
   * Role key the invited user will receive.
   */
  #role: string;

  /**
   * Facility the invited user will access.
   */
  #facility: string;

  /**
   * Optional note included in the invitation.
   */
  #note: string;

  /**
   * Invitation status (pending, accepted or expired).
   */
  #status: string;

  /**
   * Date the invitation was sent (ISO 8601).
   */
  #sentAt: string;

  /**
   * Creates a new invitation.
   * @param invitation - Initial values of the invitation.
   */
  constructor(invitation: { id: number; fullName: string; email: string; role: string; facility: string; note: string; status: string; sentAt: string }) {
    this.#id = invitation.id;
    this.#fullName = invitation.fullName;
    this.#email = invitation.email;
    this.#role = invitation.role;
    this.#facility = invitation.facility;
    this.#note = invitation.note;
    this.#status = invitation.status;
    this.#sentAt = invitation.sentAt;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get fullName(): string { return this.#fullName; }
  set fullName(value: string) { this.#fullName = value; }

  get email(): string { return this.#email; }
  set email(value: string) { this.#email = value; }

  get role(): string { return this.#role; }
  set role(value: string) { this.#role = value; }

  get facility(): string { return this.#facility; }
  set facility(value: string) { this.#facility = value; }

  get note(): string { return this.#note; }
  set note(value: string) { this.#note = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get sentAt(): string { return this.#sentAt; }
  set sentAt(value: string) { this.#sentAt = value; }
}
