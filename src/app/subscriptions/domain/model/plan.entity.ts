import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a subscription plan offered by DoofPlus.
 */
export class Plan implements BaseEntity {
  /**
   * Unique identifier of the plan.
   */
  #id: number;

  /**
   * Plan key (standard-lab or enterprise).
   */
  #key: string;

  /**
   * Display name of the plan.
   */
  #name: string;

  /**
   * Price per month in US dollars.
   */
  #monthlyPrice: number;

  /**
   * Price per year in US dollars (two months free).
   */
  #annualPrice: number;

  /**
   * Maximum number of users; 0 means unlimited.
   */
  #userLimit: number;

  /**
   * Maximum number of IoT devices; 0 means unlimited.
   */
  #iotDeviceLimit: number;

  /**
   * Creates a new plan.
   * @param plan - Initial values of the plan.
   */
  constructor(plan: { id: number; key: string; name: string; monthlyPrice: number; annualPrice: number; userLimit: number; iotDeviceLimit: number }) {
    this.#id = plan.id;
    this.#key = plan.key;
    this.#name = plan.name;
    this.#monthlyPrice = plan.monthlyPrice;
    this.#annualPrice = plan.annualPrice;
    this.#userLimit = plan.userLimit;
    this.#iotDeviceLimit = plan.iotDeviceLimit;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get key(): string { return this.#key; }
  set key(value: string) { this.#key = value; }

  get name(): string { return this.#name; }
  set name(value: string) { this.#name = value; }

  get monthlyPrice(): number { return this.#monthlyPrice; }
  set monthlyPrice(value: number) { this.#monthlyPrice = value; }

  get annualPrice(): number { return this.#annualPrice; }
  set annualPrice(value: number) { this.#annualPrice = value; }

  get userLimit(): number { return this.#userLimit; }
  set userLimit(value: number) { this.#userLimit = value; }

  get iotDeviceLimit(): number { return this.#iotDeviceLimit; }
  set iotDeviceLimit(value: number) { this.#iotDeviceLimit = value; }
}
