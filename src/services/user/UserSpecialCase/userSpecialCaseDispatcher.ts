import { TurnContext } from "botbuilder";
import { DispatchFactoryHandlerUser } from "../dispatchFactoryUser.js";
import { UserDataError } from "../../../domain/error/UserError.js";

export class DispatcherNotHandlerUser extends DispatchFactoryHandlerUser {
    constructor() {super();}

    async handleUserDispatch(context: TurnContext): Promise<any> {
        throw new UserDataError("Handler user not found!")
    }
}