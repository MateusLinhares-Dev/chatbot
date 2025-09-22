import { Request, Response } from "express";
import { BodyRequest } from "../dto/validation/zodBodyReqNotify";
import { adapter } from "../services/bot/botbuilder";
import { env } from "../services/env";
import { TurnContext } from "botbuilder";
import { DispatcherNotify } from "../services/bot/dipatcherNotify";
import { DispatcherNotifyFollowUp } from "../services/bot/handlers/dispatcherNotify";
import { NotifyTrackingCardStart } from "../domain/notify/notifyTrackingStart";

const dispatch = new DispatcherNotify()
const notifyTrackingCardStart = new NotifyTrackingCardStart()
dispatch.registerHandler("trackingStart", new DispatcherNotifyFollowUp(notifyTrackingCardStart))

export const NotifyTrackingStart = async (
    req: Request<{}, {}, BodyRequest>, 
    res: Response) => {
        
        try {
            const { dataNormalizeUser, profile } = req.body

            await adapter.continueConversationAsync(
                env.MicrosoftAppId!,
                profile.UserProfile.conversationReference,
                async (turnContext :TurnContext) => {
                    const handler = await dispatch.getHandler("trackingStart")
                    handler.setData(dataNormalizeUser)
                    await handler.handleNotify(turnContext)
                }
            )

        } catch (error) {
            res.status(400).json({
            message: "Falha ao processar a notificação",
            error: error instanceof Error ? error.message : String(error)
            });
        }
    }