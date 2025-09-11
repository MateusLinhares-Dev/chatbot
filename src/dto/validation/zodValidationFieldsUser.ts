import { email, z } from 'zod';

export const CreateUserSchema = z.object({
    id: z.string().min(1, "ID is required"),
    name: z.string().min(1, "Name is required"),
    email: email("Invalid email address"),
})

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;