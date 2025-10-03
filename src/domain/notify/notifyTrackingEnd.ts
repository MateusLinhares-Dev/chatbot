import { NotifyCard } from "./abstract/notifyCard.js";

export class NotifyTrackingCardEnd extends NotifyCard {
    constructor() {
        super();
    }

    getFileJson() {
        this.pathJson = "../../../cards/notifyCardTrackingEnd.json"
        return this.pathJson
    }
}