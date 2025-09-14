import { email, z } from 'zod';

export const CreateUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: email("Invalid email address"),
})

type CreateUserSchema = z.infer<typeof CreateUserSchema>;