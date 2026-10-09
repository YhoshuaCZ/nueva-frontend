import {WorkspaceEnvironment} from '../../../shared/presentation/workspace-environments';

/**
 * Command with the credentials a user enters to sign in to an environment.
 */
export class SignInCommand {
  /**
   * Work email of the user.
   */
  #email: string;

  /**
   * Password of the user.
   */
  #password: string;

  /**
   * Environment the user wants to enter.
   */
  #environment: WorkspaceEnvironment;

  /**
   * Creates a new sign-in command.
   * @param command - Credentials and requested environment.
   */
  constructor(command: { email: string; password: string; environment: WorkspaceEnvironment }) {
    this.#email = command.email;
    this.#password = command.password;
    this.#environment = command.environment;
  }

  get email(): string { return this.#email; }

  get password(): string { return this.#password; }

  get environment(): WorkspaceEnvironment { return this.#environment; }
}
