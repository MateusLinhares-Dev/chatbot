import { DispatchFactoryHandlerUser } from "./dispatchFactoryUser.js";
import { DispatcherNotHandlerUser } from "./UserSpecialCase/userSpecialCaseDispatcher.js";


export class DispatchController {
    private handlers: Map<string, DispatchFactoryHandlerUser> = new Map();

    registerHandler(key: string, handler: DispatchFactoryHandlerUser): void {
        this.handlers.set(key, handler);
    }

    async getHandler(context, key: string): Promise<any> {
        const command = this.handlers.get(key);
        if (!command) {
            return new DispatcherNotHandlerUser().handleUserDispatch(context)
        }
        return command.handleUserDispatch(context);
    }

}