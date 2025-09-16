import { DispatchFactoryHandlerUser } from "./dispatchFactoryUser";


export class DispatchController {
    private handlers: Map<string, DispatchFactoryHandlerUser> = new Map();

    registerHandler(key: string, handler: DispatchFactoryHandlerUser): void {
        this.handlers.set(key, handler);
    }

    async getHandler(context, key: string): Promise<any> {
        const command = this.handlers.get(key);
        if (!command) {
            throw new Error(`Handler not found for key: ${key}`);
        }
        return command.handleUserDispatch(context);
    }

}