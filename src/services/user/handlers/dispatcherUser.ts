import { StatePropertyAccessor, TurnContext } from "botbuilder";
import { DispatchFactoryHandlerUser } from "../dispatchFactoryUser";
import { userStateInfo } from "../../../dto/interfaceInfoUserState";
import { UserService } from "../userService";

export class DispatcherHandlerUser extends DispatchFactoryHandlerUser {
    constructor(private userProfileAccessor: StatePropertyAccessor<userStateInfo>) {super();}
    
    async handleUserDispatch(context: TurnContext): Promise<userStateInfo> {
        let profile = await this.userProfileAccessor.get(context, { id: context.activity.from.id });

        if (profile.email && profile.name && profile.conversationReference) {
            return profile;
        }

        const user = await UserService.getValidateUser(context);

        if (!user) {
            throw new Error("Este usuário não possui e-mail.");
        }

        profile.email = user.email;
        profile.name = user.name;
        profile.conversationReference = TurnContext.getConversationReference(context.activity);

        await this.userProfileAccessor.set(context, profile);
        return profile;
    }
}
