import { StatePropertyAccessor, TurnContext } from "botbuilder";
import { DispatchFactoryHandlerUser } from "../dispatchFactoryUser.js";
import { userStateInfo } from "../../../dto/interfaceInfoUserState.js";
import { UserService } from "../userService.js";

export class DispatcherHandlerUser extends DispatchFactoryHandlerUser {
    constructor(private userProfileAccessor: StatePropertyAccessor<userStateInfo>) {super();}
    
    async handleUserDispatch(context: TurnContext): Promise<userStateInfo> {
        let profile = await this.userProfileAccessor.get(context, { id: context.activity.from.id });
        if (profile.email && profile.name && profile.conversationReference) {
            return profile;
        }

        const user = await UserService.getValidateUser(context);
        profile.email = user.email;
        profile.name = user.name;
        
        profile.conversationReference = TurnContext.getConversationReference(context.activity);

        await this.userProfileAccessor.set(context, profile);
        return profile;
    }
}
