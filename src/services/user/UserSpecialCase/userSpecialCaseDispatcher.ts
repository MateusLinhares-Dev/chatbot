import { TurnContext } from "botbuilder";
import { DispatchFactoryHandlerUser } from "../dispatchFactoryUser";
import { UserDataError } from "../../../domain/error/UserError";

export class DispatcherNotHandlerUser extends DispatchFactoryHandlerUser {
    constructor() {super();}

    async handleUserDispatch(context: TurnContext): Promise<any> {
        throw new UserDataError("Handler user not found!")
    }
}