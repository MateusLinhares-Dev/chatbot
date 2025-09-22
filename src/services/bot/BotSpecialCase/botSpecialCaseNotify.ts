import { TurnContext } from "botbuilder";
import { NotifyHandler } from "../notifyHandler";
import { NotifyError } from "../../../domain/error/NotifyError";

export class DispatcherNotifyNotLocalized extends NotifyHandler {
    constructor() {
        super();
    }

    async handleNotify(context: TurnContext): Promise<void> {
        throw new NotifyError("Notify handler not exist!")
    }

    setData(data: any): void {
        this.data = data;
    }
}