import { NotifyError } from "../../domain/error/NotifyError.js";
import { DispatcherNotifyNotLocalized } from "./BotSpecialCase/botSpecialCaseNotify.js";
import { NotifyHandler } from "./notifyHandler.js";

export class DispatcherNotify {
    private handlers: Map<string, NotifyHandler> = new Map();

    registerHandler(key: string, handler: NotifyHandler) {
        this.handlers.set(key, handler);
    }

    async getHandler(key: string): Promise<NotifyHandler> {
        const command = this.handlers.get(key);
        if (!command) {
            return new DispatcherNotifyNotLocalized()
        }

        try {
            return command
        } catch (error) {
            throw new NotifyError(`Failed to process notification for key: ${key}`, error as Error);
        }
    }
}