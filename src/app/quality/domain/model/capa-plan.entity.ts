import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a corrective and preventive action plan.
 */
export class CapaPlan implements BaseEntity {
  /**
   * Unique identifier of the CAPA plan.
   */
  #id: number;

  /**
   * CAPA code, such as CAPA-26009.
   */
  #code: string;

  /**
   * Problem addressed.
   */
  #title: string;

  /**
   * Deviation that originated the plan.
   */
  #sourceDeviation: string;

  /**
   * Plan owner.
   */
  #owner: string;

  /**
   * Independent reviewer.
   */
  #reviewer: string;

  /**
   * Root cause found.
   */
  #rootCause: string;

  /**
   * Effectiveness acceptance criterion.
   */
  #acceptanceCriterion: string;

  /**
   * Date of the effectiveness check (ISO 8601).
   */
  #effectivenessCheckAt: string;

  /**
   * Status (draft, in-progress, in-approval or closed).
   */
  #status: string;

  /**
   * Creates a new CAPA plan.
   * @param capaPlan - Initial values of the CAPA plan.
   */
  constructor(capaPlan: { id: number; code: string; title: string; sourceDeviation: string; owner: string; reviewer: string; rootCause: string; acceptanceCriterion: string; effectivenessCheckAt: string; status: string }) {
    this.#id = capaPlan.id;
    this.#code = capaPlan.code;
    this.#title = capaPlan.title;
    this.#sourceDeviation = capaPlan.sourceDeviation;
    this.#owner = capaPlan.owner;
    this.#reviewer = capaPlan.reviewer;
    this.#rootCause = capaPlan.rootCause;
    this.#acceptanceCriterion = capaPlan.acceptanceCriterion;
    this.#effectivenessCheckAt = capaPlan.effectivenessCheckAt;
    this.#status = capaPlan.status;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get sourceDeviation(): string { return this.#sourceDeviation; }
  set sourceDeviation(value: string) { this.#sourceDeviation = value; }

  get owner(): string { return this.#owner; }
  set owner(value: string) { this.#owner = value; }

  get reviewer(): string { return this.#reviewer; }
  set reviewer(value: string) { this.#reviewer = value; }

  get rootCause(): string { return this.#rootCause; }
  set rootCause(value: string) { this.#rootCause = value; }

  get acceptanceCriterion(): string { return this.#acceptanceCriterion; }
  set acceptanceCriterion(value: string) { this.#acceptanceCriterion = value; }

  get effectivenessCheckAt(): string { return this.#effectivenessCheckAt; }
  set effectivenessCheckAt(value: string) { this.#effectivenessCheckAt = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }
}
