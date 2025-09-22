import { DomainError } from "./DomainError";

export class TimeStampError extends DomainError {
    public readonly cause?: Error;

    constructor(message: string, cause?: Error) {
        super(message);
        this.name = "TimeStampError";
        this.cause = cause;
  }
}