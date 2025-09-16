import { TurnContext } from "botbuilder";
import { NotifyHandler } from "../notifyHandler";
import { getNotifyCardFollowUpStart } from "../../notification/getNotifyFollowUpStart";
import { editNotificationCard } from "../../notification/editCardNotify";

export class DispatcherNotifyFollowUpStart extends NotifyHandler {
    constructor() {
        super();
    }

    async handleNotify(context: TurnContext): Promise<void> {
        try{
            const fileContent = await getNotifyCardFollowUpStart('../../../cards/notifyCardFollowUpStart.json')
            const cardEdit = editNotificationCard(fileContent, this.data)

            const adaptiveCardAttachment = {
            contentType: "application/vnd.microsoft.card.adaptive",
            content: cardEdit,
            };

            await context.sendActivity({
            attachments: [adaptiveCardAttachment],
});
        } catch (error) {
            throw new Error(error)
        }
    }

    setData(data: any): void {
        this.data = data;
    }
}