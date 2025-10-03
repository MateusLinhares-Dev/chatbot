import { NotifyCard } from "./abstract/notifyCard.js";

export class NotifyFollowUpCardStart extends NotifyCard{
    constructor() {
        super();
    }

    getFileJson() {
        this.pathJson = "../../../cards/notifyCardFollowUpStart.json"
        return this.pathJson
    }
}