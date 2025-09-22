import { DomainError } from "./DomainError";

export class ProfileDataError extends DomainError {
    public readonly cause?: Error;

    constructor(message: string, cause?: Error) {
        super(message);
        this.name = "ProfileDataError";
        this.cause = cause;
  }
}