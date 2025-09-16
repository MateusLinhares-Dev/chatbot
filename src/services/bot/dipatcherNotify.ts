import { NotifyHandler } from "./notifyHandler";

export class DispatcherNotify {
    private handlers: Map<string, NotifyHandler> = new Map();

    registerHandler(key: string, handler: NotifyHandler) {
        this.handlers.set(key, handler);
    }

    async getHandler(key: string): Promise<NotifyHandler> {
        const command = this.handlers.get(key);
        if (!command) {
            throw new Error(`No handler registered for key: ${key}`);
        }

        try {
            return command
        } catch (error) {
            throw new Error(`Failed to process notification for key: ${key}`);
        }
    }
}