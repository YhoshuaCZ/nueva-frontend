import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an administrative event of the organization, such as an invitation or a profile change.
 */
export class AdministrativeActivity implements BaseEntity {
  /**
   * Unique identifier of the administrative activity.
   */
  #id: number;

  /**
   * Description of the event.
   */
  #title: string;

  /**
   * Person or system that performed the event.
   */
  #actor: string;

  /**
   * Date and time of the event (ISO 8601).
   */
  #occurredAt: string;

  /**
   * Creates a new administrative activity.
   * @param administrativeActivity - Initial values of the administrative activity.
   */
  constructor(administrativeActivity: { id: number; title: string; actor: string; occurredAt: string }) {
    this.#id = administrativeActivity.id;
    this.#title = administrativeActivity.title;
    this.#actor = administrativeActivity.actor;
    this.#occurredAt = administrativeActivity.occurredAt;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get actor(): string { return this.#actor; }
  set actor(value: string) { this.#actor = value; }

  get occurredAt(): string { return this.#occurredAt; }
  set occurredAt(value: string) { this.#occurredAt = value; }
}
