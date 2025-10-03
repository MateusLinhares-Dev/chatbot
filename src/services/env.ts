import { z } from 'zod';

const envSchema = z.object({
    MicrosoftAppId: z.string().min(1, "MicrosoftAppId is required"),
    MicrosoftAppPassword: z.string().min(1, "MicrosoftAppPassword is required"),
    port: z.coerce.number().int().optional(),
    BlobContainerName: z.string().min(1, "BlobContainerName is required"),
    BlobConnectionString: z.string().min(1, "BlobConnectionString is required"),
    UrlSuite: z.string().min(1, "UrlSuite is required"),
    ApiKey: z.string().min(1, "ApiKey is required"),
    REDIS_URL: z.string().min(1, "REDIS_URL is required"),
    urlSesuiteRest: z.string().min(1, "ApiKeyRest is required"),
    MicrosoftAppTenantId: z.string().min(1, "MicrosoftAppTenantId is required!")
})

export const env = envSchema.parse({
  MicrosoftAppId: process.env.MicrosoftAppId,
  MicrosoftAppPassword: process.env.MicrosoftAppPassword,
  port: process.env.port,
  BlobContainerName: process.env.BlobContainerName,
  BlobConnectionString: process.env.BlobConnectionString,
  UrlSuite: process.env.UrlSuite,
  ApiKey: process.env.ApiKey,
  REDIS_URL: process.env.REDIS_URL,
  urlSesuiteRest: process.env.urlSesuiteRest,
  MicrosoftAppTenantId: process.env.MicrosoftAppTenantId
});