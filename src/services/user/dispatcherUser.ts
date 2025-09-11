import { TurnContext } from "botbuilder";
import { DispatchFactoryHandlerUser } from "./abstract/dispatchFactoryUser";

class DispatcherHandlerUser extends DispatchFactoryHandlerUser {
    async handleUserDispatch(context: TurnContext): Promise<void> {
        // Implementar lógica para lidar com a distribuição de mensagens do usuário
    }
}
