import z from "zod";
import { defaultInterfaceInfoReqNotify } from "./zodInfoReqNotify.js";
import { ZodValidationReferenceUser } from "./zodValidationReference.js";

const bodySchema = z.object({
  dataNormalizeUser: defaultInterfaceInfoReqNotify,
  profile: ZodValidationReferenceUser
});

export type BodyRequest = z.infer<typeof bodySchema>;