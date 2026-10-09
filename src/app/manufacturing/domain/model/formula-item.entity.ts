import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a component or a process parameter of a master formula.
 */
export class FormulaItem implements BaseEntity {
  /**
   * Unique identifier of the formula item.
   */
  #id: number;

  /**
   * Identifier of the master formula.
   */
  #formulaId: number;

  /**
   * Kind of item (component or parameter).
   */
  #kind: string;

  /**
   * Name of the component or parameter.
   */
  #name: string;

  /**
   * Function of the component, such as binder.
   */
  #role: string;

  /**
   * Quantity per batch or target value, with its unit.
   */
  #target: string;

  /**
   * Allowed tolerance.
   */
  #tolerance: string;

  /**
   * Supplier, lot or sensor that controls the item.
   */
  #control: string;

  /**
   * Creates a new formula item.
   * @param formulaItem - Initial values of the formula item.
   */
  constructor(formulaItem: { id: number; formulaId: number; kind: string; name: string; role: string; target: string; tolerance: string; control: string }) {
    this.#id = formulaItem.id;
    this.#formulaId = formulaItem.formulaId;
    this.#kind = formulaItem.kind;
    this.#name = formulaItem.name;
    this.#role = formulaItem.role;
    this.#target = formulaItem.target;
    this.#tolerance = formulaItem.tolerance;
    this.#control = formulaItem.control;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get formulaId(): number { return this.#formulaId; }
  set formulaId(value: number) { this.#formulaId = value; }

  get kind(): string { return this.#kind; }
  set kind(value: string) { this.#kind = value; }

  get name(): string { return this.#name; }
  set name(value: string) { this.#name = value; }

  get role(): string { return this.#role; }
  set role(value: string) { this.#role = value; }

  get target(): string { return this.#target; }
  set target(value: string) { this.#target = value; }

  get tolerance(): string { return this.#tolerance; }
  set tolerance(value: string) { this.#tolerance = value; }

  get control(): string { return this.#control; }
  set control(value: string) { this.#control = value; }
}
