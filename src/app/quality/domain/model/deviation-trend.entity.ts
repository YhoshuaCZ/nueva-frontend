import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents the number of closed deviations of a root cause in a month.
 */
export class DeviationTrend implements BaseEntity {
  /**
   * Unique identifier of the deviation trend.
   */
  #id: number;

  /**
   * Root-cause category.
   */
  #rootCause: string;

  /**
   * Month (YYYY-MM).
   */
  #month: string;

  /**
   * Closed deviations.
   */
  #count: number;

  /**
   * Creates a new deviation trend.
   * @param deviationTrend - Initial values of the deviation trend.
   */
  constructor(deviationTrend: { id: number; rootCause: string; month: string; count: number }) {
    this.#id = deviationTrend.id;
    this.#rootCause = deviationTrend.rootCause;
    this.#month = deviationTrend.month;
    this.#count = deviationTrend.count;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get rootCause(): string { return this.#rootCause; }
  set rootCause(value: string) { this.#rootCause = value; }

  get month(): string { return this.#month; }
  set month(value: string) { this.#month = value; }

  get count(): number { return this.#count; }
  set count(value: number) { this.#count = value; }
}
