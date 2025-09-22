import { Request, Response } from "express";
import { BodyRequest } from "../dto/validation/zodBodyReqNotify";
import { adapter } from "../services/bot/botbuilder";
import { TurnContext } from "botbuilder";
import { DispatcherNotify } from "../services/bot/dipatcherNotify";
import { DispatcherNotifyFollowUp } from "../services/bot/handlers/dispatcherNotify";
import { env } from "../services/env";
import { NotifyTrackingCardEnd } from "../domain/notify/notifyTrackingEnd";

const dispatch = new DispatcherNotify()
const notifyCardTrackingEnd = new NotifyTrackingCardEnd()
dispatch.registerHandler("TrackingEnd", new DispatcherNotifyFollowUp(notifyCardTrackingEnd))

export const NotifyTrackingEnd = async (
    req: Request<{}, {}, BodyRequest>, 
    res: Response) => {

    try {
        const {dataNormalizeUser, profile } = req.body
        await adapter.continueConversationAsync(
                    env.MicrosoftAppId!,
                    profile.UserProfile.conversationReference,
                    async (turnContext: TurnContext) => {
                        const handler = await dispatch.getHandler("TrackingEnd");
                        handler.setData(dataNormalizeUser);
                        await handler.handleNotify(turnContext);
                    }
                )
        res.status(200).json({
            message: "Notificação processada com sucesso",
        });
    } catch(error) {
        res.status(400).json({
            message: "Falha ao processar a notificação",
            error: error instanceof Error ? error.message : String(error)
        });
    } 
}