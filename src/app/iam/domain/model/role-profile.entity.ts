import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a least-privilege profile that groups the permissions of a role.
 */
export class RoleProfile implements BaseEntity {
  /**
   * Unique identifier of the role profile.
   */
  #id: number;

  /**
   * Role key referenced by users.
   */
  #key: string;

  /**
   * Display name of the profile.
   */
  #name: string;

  /**
   * Records the profile can create or edit.
   */
  #createEdit: string[];

  /**
   * What the profile can approve or sign.
   */
  #approveSign: string;

  /**
   * Main restriction of the profile.
   */
  #restriction: string;

  /**
   * Color tone of the profile chip.
   */
  #tone: string;

  /**
   * Creates a new role profile.
   * @param roleProfile - Initial values of the role profile.
   */
  constructor(roleProfile: { id: number; key: string; name: string; createEdit: string[]; approveSign: string; restriction: string; tone: string }) {
    this.#id = roleProfile.id;
    this.#key = roleProfile.key;
    this.#name = roleProfile.name;
    this.#createEdit = roleProfile.createEdit;
    this.#approveSign = roleProfile.approveSign;
    this.#restriction = roleProfile.restriction;
    this.#tone = roleProfile.tone;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get key(): string { return this.#key; }
  set key(value: string) { this.#key = value; }

  get name(): string { return this.#name; }
  set name(value: string) { this.#name = value; }

  get createEdit(): string[] { return this.#createEdit; }
  set createEdit(value: string[]) { this.#createEdit = value; }

  get approveSign(): string { return this.#approveSign; }
  set approveSign(value: string) { this.#approveSign = value; }

  get restriction(): string { return this.#restriction; }
  set restriction(value: string) { this.#restriction = value; }

  get tone(): string { return this.#tone; }
  set tone(value: string) { this.#tone = value; }
}
