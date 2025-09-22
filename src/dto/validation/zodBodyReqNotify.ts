import z from "zod";
import { defaultInterfaceInfoReqNotify } from "./zodInfoReqNotify";
import { ZodValidationReferenceUser } from "./zodValidationReference";

const bodySchema = z.object({
  dataNormalizeUser: defaultInterfaceInfoReqNotify,
  profile: ZodValidationReferenceUser
});

export type BodyRequest = z.infer<typeof bodySchema>;