import { TurnContext } from "botbuilder";
import { Request, Response } from "express";
import { adapter } from "../services/bot/botbuilder";
import { env } from "../services/env";
import { BodyRequest } from "../dto/validation/zodBodyReqNotify";
import { DispatcherNotify } from "../services/bot/dipatcherNotify";
import { DispatcherNotifyFollowUp } from "../services/bot/handlers/dispatcherNotify";
import { NotifyFollowUpCardEnd } from "../domain/notify/notifyFollowUpEnd";

const dispatch = new DispatcherNotify()
const notifyFollowUpCardEnd = new NotifyFollowUpCardEnd()
dispatch.registerHandler("followUpEnd", new DispatcherNotifyFollowUp(notifyFollowUpCardEnd))

export const NotifyFollowUpEnd = async (
    req: Request<{}, {}, BodyRequest>, 
    res: Response) => {

    try{
        const {dataNormalizeUser, profile } = req.body

        await adapter.continueConversationAsync(
            env.MicrosoftAppId!,
            profile.UserProfile.conversationReference,
            async (turnContext: TurnContext) => {
                const handler = await dispatch.getHandler("followUpEnd");
                handler.setData(dataNormalizeUser);
                await handler.handleNotify(turnContext);
            }
        )
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

// Todo: Verificar se o tipo de retorno do continueConversationAsync está correto e criar o card para notificação proativa E implementar o handler do followUpEnd