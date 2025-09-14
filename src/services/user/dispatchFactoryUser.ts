import { TurnContext } from "botbuilder";

export abstract class DispatchFactoryHandlerUser {
    abstract handleUserDispatch(context: TurnContext): Promise<any>;
}