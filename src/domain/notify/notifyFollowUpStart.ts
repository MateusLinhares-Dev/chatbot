import { NotifyCard } from "./abstract/notifyCard";

export class NotifyFollowUpCardStart extends NotifyCard{
    constructor() {
        super();
    }

    getFileJson() {
        this.pathJson = "../../../cards/notifyCardFollowUpStart.json"
        return this.pathJson
    }
}