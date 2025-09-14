import { BlobServiceClient } from "@azure/storage-blob";
import { env } from "../env";
import { interfaceInfoReqNotify } from "../../dto/interfaceInfoRequestNotify";
import { normalizeRequestBody } from "../user/useNormalizeRequestBody";
import { ZodValidationReferenceUser } from "../../dto/validation/zodValidationReference";

export async function findUserReference(user: interfaceInfoReqNotify): Promise<null> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(env.BlobConnectionString);
    const containerCliente = blobServiceClient.getContainerClient(env.BlobContainerName);


    for await (const blob of containerCliente.listBlobsFlat()) {
        const blockBlobClient = containerCliente.getBlockBlobClient(blob.name);
        const download = await blockBlobClient.download(0);
        const content = await streamToString(download.readableStreamBody);
        const profile = JSON.parse(content);

        const normalizeProfile = normalizeRequestBody(profile.UserProfile)
        
        if ((user.email && normalizeProfile.email === user.email) || (user.name && normalizeProfile.name === user.name)) {
            try {
                ZodValidationReferenceUser.parse(profile);
                return profile;
            } catch (err) {
                throw new Error("Profile data is invalid");
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