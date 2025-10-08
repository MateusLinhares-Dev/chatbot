import { Request, Response } from "express";
import { BodyRequest } from "../dto/validation/zodBodyReqNotify.js";
import { adapter } from "../services/bot/botbuilder.js";
import { TurnContext } from "botbuilder";
import { DispatcherNotify } from "../services/bot/dipatcherNotify.js";
import { DispatcherNotifyFollowUp } from "../services/bot/handlers/dispatcherNotify.js";
import { env } from "../services/env.js";
import { NotifyTrackingCardEnd } from "../domain/notify/notifyTrackingEnd.js";
import { requestApproval } from "../services/redis/approvalService.js";
import { NotifyCard } from "../domain/notify/abstract/notifyCard.js";

const dispatch = new DispatcherNotify()
const notifyCardTrackingEnd = new NotifyTrackingCardEnd()
dispatch.registerHandler("TrackingEnd", new DispatcherNotifyFollowUp(notifyCardTrackingEnd as NotifyCard))

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
   
        await requestApproval(
            dataNormalizeUser.registrationUser,
            dataNormalizeUser.numberTask,
            dataNormalizeUser.numberRequested,
            profile.UserProfile.conversationReference
        );

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