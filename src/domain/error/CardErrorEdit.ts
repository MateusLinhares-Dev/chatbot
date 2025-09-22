import { DomainError } from "./DomainError";

export class CardEditError extends DomainError {
    public readonly cause?: Error;

    constructor(message: string, cause?: Error) {
        super(message);
        this.name = "CardEditError";
        this.cause = cause;
  }
}