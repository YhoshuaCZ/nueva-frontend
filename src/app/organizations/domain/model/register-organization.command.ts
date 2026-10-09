/**
 * Command with the data entered in the organization registration form.
 */
export class RegisterOrganizationCommand {
  #legalName: string;
  #ruc: string;
  #facilityName: string;
  #planKey: string;
  #billingCycle: string;
  #administratorName: string;
  #administratorEmail: string;
  #password: string;

  /**
   * Creates a new registration command.
   * @param command - Organization, plan and administrator data.
   */
  constructor(command: {
    legalName: string; ruc: string; facilityName: string; planKey: string; billingCycle: string;
    administratorName: string; administratorEmail: string; password: string;
  }) {
    this.#legalName = command.legalName;
    this.#ruc = command.ruc;
    this.#facilityName = command.facilityName;
    this.#planKey = command.planKey;
    this.#billingCycle = command.billingCycle;
    this.#administratorName = command.administratorName;
    this.#administratorEmail = command.administratorEmail;
    this.#password = command.password;
  }

  get legalName(): string { return this.#legalName; }

  get ruc(): string { return this.#ruc; }

  get facilityName(): string { return this.#facilityName; }

  get planKey(): string { return this.#planKey; }

  get billingCycle(): string { return this.#billingCycle; }

  get administratorName(): string { return this.#administratorName; }

  get administratorEmail(): string { return this.#administratorEmail; }

  get password(): string { return this.#password; }
}
