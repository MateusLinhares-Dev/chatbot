import { TeamsInfo, TurnContext } from "botbuilder";
import { UserValidator } from "./validateUser";
import { userStateInfo } from "../../dto/interfaceInfoUserState";

export class UserService {
    static async getValidateUser(context: TurnContext): Promise<userStateInfo> {
        const member = await TeamsInfo.getMember(context, context.activity.from.id);
        const user = UserValidator.validate(member);
            
        return user;
    }
}