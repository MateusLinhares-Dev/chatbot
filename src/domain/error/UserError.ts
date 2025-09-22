import { DomainError } from "./DomainError";

export class UserDataError extends DomainError {
    public readonly cause?: Error;

    constructor(message: string, cause?: Error) {
        super(message);
        this.name = "UserDataError";
        this.cause = cause;
  }
}