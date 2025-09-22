import { Request, Response, NextFunction } from "express";
import { ZodValidationReferenceUser } from "../../dto/validation/zodValidationReference";
import { defaultInterfaceInfoReqNotify } from "../../dto/validation/zodInfoReqNotify";
import { findUserReference } from "../blobstorage/useFindUserReference";
import { normalizeRequestBody } from "../user/useNormalizeRequestBody";
import { ZodObject } from "zod";

export const validate = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedBody: defaultInterfaceInfoReqNotify = req.body as defaultInterfaceInfoReqNotify;
        schema.parse(parsedBody);
        const dataNormalizeUser: defaultInterfaceInfoReqNotify = normalizeRequestBody(parsedBody)
        const profile: ZodValidationReferenceUser = await findUserReference(dataNormalizeUser)
        req.body = { dataNormalizeUser, profile };

        next();
    } catch (error) {
        res.status(400).json({
            message: "Falha na validação",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}