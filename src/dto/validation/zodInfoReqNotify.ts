import z, { email } from "zod";

export const defaultInterfaceInfoReqNotify = z.object({
    name: z.string().min(1, 'name is required'),
    email: email().min(1, 'email is required'),
    numberRequested: z.string().min(1, 'numberRequested is required'),
    initiation: z.string().min(1, 'initiation is required'),
    description: z.string().optional(),
    planning: z.string().min(1, 'planning is required'),
    numberTask: z.string().optional(),
    stateRequest: z.string().optional(),
    workflowId: z.string().min(1, 'workflowId is required'),
    registrationUser: z.string().optional(),
})

export type defaultInterfaceInfoReqNotify = z.infer<typeof defaultInterfaceInfoReqNotify>;