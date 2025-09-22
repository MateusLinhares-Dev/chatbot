import { UserDataError } from "../../domain/error/UserError";
import { ZodValidationReferenceUser } from "../../dto/validation/zodValidationReference";


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
    throw new UserDataError("Reference body is incorrect", err as Error)
  }
}