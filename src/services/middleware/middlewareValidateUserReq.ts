import { Request, Response, NextFunction } from "express";
import { ZodValidationReferenceUser } from "../../dto/validation/zodValidationReference.js";
import { defaultInterfaceInfoReqNotify } from "../../dto/validation/zodInfoReqNotify.js";
import { findUserReference } from "../blobstorage/useFindUserReference.js";
import { normalizeRequestBody } from "../user/useNormalizeRequestBody.js";
import { ZodObject } from "zod";
import { getRedisClient } from "../../infrastructure/redis/redisClient.js";

export const validate = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedBody: defaultInterfaceInfoReqNotify = req.body as defaultInterfaceInfoReqNotify;
        schema.parse(parsedBody);
        const dataNormalizeUser: defaultInterfaceInfoReqNotify = normalizeRequestBody(parsedBody)
        const profile: ZodValidationReferenceUser = await findUserReference(dataNormalizeUser)

        req.body = { dataNormalizeUser, profile };

        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Houve um erro na validação dos dados",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}