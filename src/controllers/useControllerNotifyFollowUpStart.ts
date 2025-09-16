import { TurnContext } from "botbuilder";
import { findUserReference } from "../services/blobstorage/useFindUserReference";
import { adapter } from "../services/bot/botbuilder";
import { normalizeRequestBody } from "../services/user/useNormalizeRequestBody";
import { ZodValidationReferenceUser } from "../dto/validation/zodValidationReference";
import { env } from "../services/env";
import { defaultInterfaceInfoReqNotify } from "../dto/validation/zodInfoReqNotify";
import { DispatcherNotify } from "../services/bot/dipatcherNotify";
import { DispatcherNotifyFollowUpStart } from "../services/bot/handlers/dispatcherNotifyFollowUpStart";

const dispatch = new DispatcherNotify()
dispatch.registerHandler("followUpStart", new DispatcherNotifyFollowUpStart())

export const NotifyFollowUpStart = async (req, res) => {
    try {
        const parsedBody: defaultInterfaceInfoReqNotify = req.body as defaultInterfaceInfoReqNotify;
        defaultInterfaceInfoReqNotify.parse(parsedBody);
        console.log(parsedBody)

        const dataNormalizeUser: defaultInterfaceInfoReqNotify = normalizeRequestBody(parsedBody)
        const profile: ZodValidationReferenceUser = await findUserReference(dataNormalizeUser)
        console.log(dataNormalizeUser)
        await adapter.continueConversationAsync(
            env.MicrosoftAppId!,    
            profile.UserProfile.conversationReference,       
            async (turnContext: TurnContext) => {

                const handler = await dispatch.getHandler("followUpStart");

                if (handler) {
                    handler.setData(dataNormalizeUser);
                    await handler.handleNotify(turnContext);
                } else {
                    throw new Error("No handler found for follow-up start notification");
                }
            }
        );
        
        res.status(200).json({
            message: "Notificação processada com sucesso",
        });
    } catch (error) {
        res.status(400).json({
            message: "Falha ao processar a notificação",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}

// TODO: Verificar se o tipo de retorno do continueConversationAsync está correto e criar o card para notificação proativa