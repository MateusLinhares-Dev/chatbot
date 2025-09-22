import { TurnContext } from "botbuilder";
import { NotifyHandler } from "../notifyHandler";
import { getNotifyCardFollowUpStart } from "../../notification/getNotifyFollowUpStart";
import { editNotificationCard } from "../../notification/editCardNotify";
import { CardEditError } from "../../../domain/error/CardErrorEdit";
import { NotifyCard } from "../../../domain/notify/abstract/notifyCard";

export class DispatcherNotifyFollowUp extends NotifyHandler {
    private notifyAdapter: NotifyCard
    
    constructor(notifyAdapter: NotifyCard) {
        super();
        this.notifyAdapter = notifyAdapter
    }

    async handleNotify(context: TurnContext): Promise<void> {
        try{
            this.verifyIfDataNotIsNull()
            const fileContent = await getNotifyCardFollowUpStart(this.notifyAdapter.getFileJson())
            const cardEdit = editNotificationCard(fileContent, this.data)

            const adaptiveCardAttachment = {
                contentType: "application/vnd.microsoft.card.adaptive",
                content: cardEdit,
            };

            await context.sendActivity({
                attachments: [adaptiveCardAttachment],
            });
        } catch (error) {
            console.log(error)
            throw new CardEditError("Error in adapter card!", error as Error)
        }
    }

    setData(data: any): void {
        this.data = data;
    }
}