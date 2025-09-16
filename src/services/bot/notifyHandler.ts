import { TurnContext } from "botbuilder";

export abstract class NotifyHandler {
    protected data: any;
    abstract handleNotify(context: TurnContext): Promise<void>
    abstract setData(data: any): void
}