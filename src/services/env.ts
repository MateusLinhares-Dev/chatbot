import { z } from 'zod';

const envSchema = z.object({
    MicrosoftAppId: z.string().min(1, "MicrosoftAppId is required"),
    MicrosoftAppPassword: z.string().min(1, "MicrosoftAppPassword is required"),
    port: z.coerce.number().int().optional(),
    BlobContainerName: z.string().min(1, "BlobContainerName is required"),
    BlobConnectionString: z.string().min(1, "BlobConnectionString")
})

export const env = envSchema.parse({
  MicrosoftAppId: process.env.MicrosoftAppId,
  MicrosoftAppPassword: process.env.MicrosoftAppPassword,
  port: process.env.port,
  BlobContainerName: process.env.BlobContainerName,
  BlobConnectionString: process.env.BlobConnectionString
});