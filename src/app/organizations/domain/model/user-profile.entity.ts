import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents the personal data and notification preferences of a user.
 */
export class UserProfile implements BaseEntity {
  /**
   * Unique identifier of the user profile.
   */
  #id: number;

  /**
   * Identifier of the IAM user the profile belongs to.
   */
  #userId: number;

  /**
   * First name.
   */
  #firstName: string;

  /**
   * Last name.
   */
  #lastName: string;

  /**
   * Work email, managed by IAM.
   */
  #email: string;

  /**
   * Area where the user works.
   */
  #area: string;

  /**
   * Site where the user works.
   */
  #site: string;

  /**
   * Whether critical events are sent by email.
   */
  #emailNotifications: boolean;

  /**
   * Whether tasks and alerts appear in the notification bell.
   */
  #inAppNotifications: boolean;

  /**
   * Preferred language (en or es).
   */
  #language: string;

  /**
   * Creates a new user profile.
   * @param userProfile - Initial values of the user profile.
   */
  constructor(userProfile: { id: number; userId: number; firstName: string; lastName: string; email: string; area: string; site: string; emailNotifications: boolean; inAppNotifications: boolean; language: string }) {
    this.#id = userProfile.id;
    this.#userId = userProfile.userId;
    this.#firstName = userProfile.firstName;
    this.#lastName = userProfile.lastName;
    this.#email = userProfile.email;
    this.#area = userProfile.area;
    this.#site = userProfile.site;
    this.#emailNotifications = userProfile.emailNotifications;
    this.#inAppNotifications = userProfile.inAppNotifications;
    this.#language = userProfile.language;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get userId(): number { return this.#userId; }
  set userId(value: number) { this.#userId = value; }

  get firstName(): string { return this.#firstName; }
  set firstName(value: string) { this.#firstName = value; }

  get lastName(): string { return this.#lastName; }
  set lastName(value: string) { this.#lastName = value; }

  get email(): string { return this.#email; }
  set email(value: string) { this.#email = value; }

  get area(): string { return this.#area; }
  set area(value: string) { this.#area = value; }

  get site(): string { return this.#site; }
  set site(value: string) { this.#site = value; }

  get emailNotifications(): boolean { return this.#emailNotifications; }
  set emailNotifications(value: boolean) { this.#emailNotifications = value; }

  get inAppNotifications(): boolean { return this.#inAppNotifications; }
  set inAppNotifications(value: boolean) { this.#inAppNotifications = value; }

  get language(): string { return this.#language; }
  set language(value: string) { this.#language = value; }
}
