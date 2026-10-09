import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a user account of a laboratory in the IAM domain model.
 */
export class User implements BaseEntity {
  /**
   * Unique identifier of the user.
   */
  #id: number;

  /**
   * Full name of the user.
   */
  #fullName: string;

  /**
   * Initials shown in the avatar.
   */
  #initials: string;

  /**
   * Work email used to sign in.
   */
  #email: string;

  /**
   * Role key assigned by the laboratory administrator.
   */
  #role: string;

  /**
   * Environment the role grants access to (qa, production or administration).
   */
  #environment: string;

  /**
   * Facilities the user can access.
   */
  #facility: string;

  /**
   * Account status (active or invited).
   */
  #status: string;

  /**
   * Identifier of the organization the user belongs to.
   */
  #organizationId: number;

  /**
   * Name of the laboratory organization.
   */
  #organizationName: string;

  /**
   * Plant where the user works.
   */
  #plant: string;

  /**
   * Special privilege shown in the workspace, if any.
   */
  #privilege: string;

  /**
   * Creates a new user.
   * @param user - Initial values of the user.
   */
  constructor(user: { id: number; fullName: string; initials: string; email: string; role: string; environment: string; facility: string; status: string; organizationId: number; organizationName: string; plant: string; privilege: string }) {
    this.#id = user.id;
    this.#fullName = user.fullName;
    this.#initials = user.initials;
    this.#email = user.email;
    this.#role = user.role;
    this.#environment = user.environment;
    this.#facility = user.facility;
    this.#status = user.status;
    this.#organizationId = user.organizationId;
    this.#organizationName = user.organizationName;
    this.#plant = user.plant;
    this.#privilege = user.privilege;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get fullName(): string { return this.#fullName; }
  set fullName(value: string) { this.#fullName = value; }

  get initials(): string { return this.#initials; }
  set initials(value: string) { this.#initials = value; }

  get email(): string { return this.#email; }
  set email(value: string) { this.#email = value; }

  get role(): string { return this.#role; }
  set role(value: string) { this.#role = value; }

  get environment(): string { return this.#environment; }
  set environment(value: string) { this.#environment = value; }

  get facility(): string { return this.#facility; }
  set facility(value: string) { this.#facility = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get organizationId(): number { return this.#organizationId; }
  set organizationId(value: number) { this.#organizationId = value; }

  get organizationName(): string { return this.#organizationName; }
  set organizationName(value: string) { this.#organizationName = value; }

  get plant(): string { return this.#plant; }
  set plant(value: string) { this.#plant = value; }

  get privilege(): string { return this.#privilege; }
  set privilege(value: string) { this.#privilege = value; }
}
