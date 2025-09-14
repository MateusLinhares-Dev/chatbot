import { userStateInfo } from "../../dto/interfaceInfoUserState";
import { CreateUserSchema } from "../../dto/validation/zodValidationFieldsUser";

export class UserValidator {
    static validate(userData: any): userStateInfo | false {
        try {
            return CreateUserSchema.parse(userData);
        } catch {
            return false
        }
    }
}