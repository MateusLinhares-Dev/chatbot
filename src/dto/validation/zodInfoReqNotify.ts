import z, { email } from "zod";

export const defaultInterfaceInfoReqNotify = z.object({
    name: z.string().min(1, 'name required'),
    email: email().min(1, 'email required'),
    numberRequested: z.string().min(1, 'numberRequested required'),
    initiation: z.string().min(1, 'initiation required'),
    description: z.string().optional(),
    planning: z.string().min(1, 'planning required'),
    numberTask: z.string().optional(),
    stateRequest: z.string().optional(),
})

export type defaultInterfaceInfoReqNotify = z.infer<typeof defaultInterfaceInfoReqNotify>;