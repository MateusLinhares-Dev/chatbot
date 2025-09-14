export interface userStateInfo {
    id: string;
    name?: string;
    email?: string;
    conversationReference?: Partial<import("botbuilder").ConversationReference>;
}
