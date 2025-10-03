import { TeamsInfo, TurnContext } from "botbuilder";
import { UserValidator } from "./validateUser.js";
import { userStateInfo } from "../../dto/interfaceInfoUserState.js";

export class UserService {
    static async getValidateUser(context: TurnContext): Promise<userStateInfo> {
        const member = await TeamsInfo.getMember(context, context.activity.from.id);
        const user = UserValidator.validate(member);
            
        return user;
    }
}