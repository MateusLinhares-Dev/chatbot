import { DomainError } from "./DomainError.js";

export class ExecuteApiError extends DomainError {
    public readonly cause?: Error;

    constructor(message: string, cause?: Error) {
        super(message);
        this.name = "ExecuteApiError";
        this.cause = cause;
  }
}