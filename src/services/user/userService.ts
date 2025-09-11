import { TeamsInfo, TurnContext } from "botbuilder";
import { UserValidator } from "./validateUser";

export class UserService {
    static async getValidateUser(context: TurnContext) {
        const member = await TeamsInfo.getMember(context, context.activity.from.id);
        const user = UserValidator.validate(member);
        return user
    }
}