import { UserDataError } from "../../domain/error/UserError.js";
import { ZodValidationReferenceUser } from "../../dto/validation/zodValidationReference.js";


export function normalizeReferenceBody(
  req: ZodValidationReferenceUser
): ZodValidationReferenceUser {
  
  try { 
    const userProfile = {
      UserProfile: {
          ...req.UserProfile,
          name: req.UserProfile.name.trim().toLowerCase().replace(/\s+/g, " "),
          email: req.UserProfile.email.trim().toLowerCase(),
      }
    }
      
    return userProfile;
  } catch (err) {
    throw new UserDataError("A referência dos dados estão incorretos!", err as Error)
  }
}