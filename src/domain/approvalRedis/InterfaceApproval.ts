import { ConversationReference } from "botbuilder";

export interface Approval {
    userId: string;
    status: "pending" | "approved" | "auto-approved";
    attempts: number;
    numberTask: string;
    numberRequested: string;
    conversationReference: ConversationReference;
}