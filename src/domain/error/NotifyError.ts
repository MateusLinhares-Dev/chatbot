import { DomainError } from "./DomainError.js";

export class NotifyError extends DomainError {
    public readonly cause?: Error;
    constructor(message: string, cause?: Error) {
        super(message)
        this.name = "NotifyError"
        this.cause = cause
    }
}