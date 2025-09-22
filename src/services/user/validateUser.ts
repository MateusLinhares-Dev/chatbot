import { userStateInfo } from "../../dto/interfaceInfoUserState";
import { CreateUserSchema } from "../../dto/validation/zodValidationFieldsUser";

export class UserValidator {
    static validate(userData: any): userStateInfo {
        return CreateUserSchema.parse(userData);
    }
}