import { TurnContext } from "botbuilder";
import { interfaceInfoReqNotify } from "../dto/interfaceInfoRequestNotify";
import { CreateUserSchema } from "../dto/validation/zodValidationFieldsUser";
import { findUserReference } from "../services/blobstorage/useFindUserReference";
import { adapter } from "../services/bot/botbuilder";
import { normalizeRequestBody } from "../services/user/useNormalizeRequestBody";
import { ZodValidationReferenceUser } from "../dto/validation/zodValidationReference";
import { env } from "../services/env";

export const NotifyFollowUpStart = async (req, res) => {
    try {
        const parsedBody: interfaceInfoReqNotify = req.body as interfaceInfoReqNotify;
        CreateUserSchema.parse(parsedBody);

        const dataNormalizeUser: interfaceInfoReqNotify = normalizeRequestBody(parsedBody)
        const profile: ZodValidationReferenceUser = await findUserReference(dataNormalizeUser)

        await adapter.continueConversationAsync(
            env.MicrosoftAppId!,    
            profile.UserProfile.conversationReference,       
            async (turnContext: TurnContext) => { 
                await turnContext.sendActivity("Olá proativamente!");
            }
        );
        res.status(200).send('Notificação processada com sucesso');
    } catch (error) {
        res.status(400).json({
            message: "Falha ao processar a notificação",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}

// TODO: Verificar se o tipo de retorno do continueConversationAsync está correto e criar o card para notificação proativa