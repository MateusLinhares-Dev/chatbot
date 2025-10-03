import { NotifyCard } from "./abstract/notifyCard.js";

export class NotifyFollowUpCardEnd extends NotifyCard {
    constructor() {
        super();
    }

    getFileJson() {
        this.pathJson = "../../../cards/notifyCardFollowUpEnd.json"
        return this.pathJson
    }
}