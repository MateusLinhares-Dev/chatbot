import z, { email } from "zod";

export const defaultInterfaceInfoReqNotify = z.object({
    name: z.string().min(1, "Name is required"),
    email: email("Invalid email address"),
})

type defaultInterfaceInfoReqNotify = z.infer<typeof defaultInterfaceInfoReqNotify>;