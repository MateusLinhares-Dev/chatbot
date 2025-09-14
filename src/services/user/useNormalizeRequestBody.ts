import { interfaceInfoReqNotify } from "../../dto/interfaceInfoRequestNotify";

export function normalizeRequestBody(req: interfaceInfoReqNotify): interfaceInfoReqNotify {
    const name  = req.name?.trim().toLowerCase();
    const email = req.email.trim().toLowerCase();

    return { name, email };
}