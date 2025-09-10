import { UserState, ConversationState, Storage } from "botbuilder";

export abstract class StateFactory  {
    abstract withCreateStorage(): this;
    abstract withCreateUserState(): this;
    abstract withCreateConversationState(): this;
    abstract getStorageState(): Storage;
    abstract getConversationState(): ConversationState;
    abstract getUserState(): UserState;
}