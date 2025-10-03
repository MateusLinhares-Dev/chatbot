import { BlobServiceClient } from "@azure/storage-blob";
import { env } from "../env.js";
import { ZodValidationReferenceUser } from "../../dto/validation/zodValidationReference.js";
import { defaultInterfaceInfoReqNotify } from "../../dto/validation/zodInfoReqNotify.js";
import { normalizeReferenceBody } from "../user/useNormalizeReferenceUser.js";
import { ProfileDataError } from "../../domain/error/ProfileDataError.js";

export async function findUserReference(user: defaultInterfaceInfoReqNotify): Promise<null> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(env.BlobConnectionString);
    const containerCliente = blobServiceClient.getContainerClient(env.BlobContainerName);


    for await (const blob of containerCliente.listBlobsFlat()) {
        const blockBlobClient = containerCliente.getBlockBlobClient(blob.name);
        const download = await blockBlobClient.download(0);
        const content = await streamToString(download.readableStreamBody);
        const profile = JSON.parse(content);
        const normalizeProfile = normalizeReferenceBody(profile)
        
        if ((user.email && normalizeProfile.UserProfile.email === user.email) || (user.name && normalizeProfile.UserProfile.name === user.name)) {
            try {
                ZodValidationReferenceUser.parse(profile);
                return profile;
            } catch (err) {
                throw new ProfileDataError('Profile data is invalid', err as Error)
            }
        }
    }

    return null;
}

async function streamToString(readableStreamBody: NodeJS.ReadableStream): Promise<string>{
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        readableStreamBody.on("data", (data: any) => { 
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        })
        readableStreamBody.on("end", () => resolve(Buffer.concat(chunks).toString('utf-8')));
        readableStreamBody.on("error", reject);
    });
}