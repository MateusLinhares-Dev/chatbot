import { userStateInfo } from "../../dto/interfaceInfoUserState.js";
import { CreateUserSchema } from "../../dto/validation/zodValidationFieldsUser.js";

export class UserValidator {
    static validate(userData: any): userStateInfo {
        return CreateUserSchema.parse(userData);
    }
}