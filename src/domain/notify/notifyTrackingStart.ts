import { NotifyCard } from "./abstract/notifyCard.js";

export class NotifyTrackingCardStart extends NotifyCard {
    constructor() {
        super();
    }

    getFileJson() {
        this.pathJson = "../../../cards/notifyCardTrackingStart.json"
        return this.pathJson
    }
}