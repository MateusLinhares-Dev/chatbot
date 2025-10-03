import { TurnContext } from "botbuilder";
import { adapter } from "../services/bot/botbuilder.js";
import { Request, Response } from "express";
import { env } from "../services/env.js";
import { DispatcherNotify } from "../services/bot/dipatcherNotify.js";
import { DispatcherNotifyFollowUp } from "../services/bot/handlers/dispatcherNotify.js";
import { BodyRequest } from "../dto/validation/zodBodyReqNotify.js";
import { NotifyFollowUpCardStart } from "../domain/notify/notifyFollowUpStart.js";

const dispatch = new DispatcherNotify()
const notifyFollowUpCardStart = new NotifyFollowUpCardStart()
dispatch.registerHandler("followUpStart", new DispatcherNotifyFollowUp(notifyFollowUpCardStart))

export const NotifyFollowUpStart = async (
    req: Request<{}, {}, BodyRequest>, 
    res: Response) => {
    try {
        const {dataNormalizeUser, profile } = req.body

        await adapter.continueConversationAsync(
            env.MicrosoftAppId!,    
            profile.UserProfile.conversationReference,       
            async (turnContext: TurnContext) => {
                const handler = await dispatch.getHandler("followUpStart");
                handler.setData(dataNormalizeUser);
                await handler.handleNotify(turnContext);
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