import z, { email } from "zod";

const conversationReference = z.object({
    activityId: z.string().optional(),
    channelId: z.string(),
    serviceUrl: z.string(),
    locale: z.string().optional()
});

const ProfileEntity = z.object({
    id: z.string(),
    email: email('Invalid email format'),
    name: z.string(),
    conversationReference: conversationReference
});

export const ZodValidationReferenceUser = z.object({
    UserProfile: ProfileEntity
});

export type ZodValidationReferenceUser = z.infer<typeof ZodValidationReferenceUser>;
