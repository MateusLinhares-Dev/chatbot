import { BlobsStorage } from "botbuilder-azure-blobs";
import { UserState, ConversationState, Storage } from "botbuilder";
import { StateFactory  } from "./interface/interfaceBlobStorage";

export class BlobStateFactory extends StateFactory {
    private blobConnectionString: string;
    private blobContainerName: string;

    private storage?: Storage;
    private userState?: UserState;
    private conversationState?: ConversationState;

    constructor(blobConnectionString: string, blobContainerName: string) {
        super();
        this.blobConnectionString = blobConnectionString;
        this.blobContainerName = blobContainerName;
    }

    withCreateStorage(): this {
        this.storage = new BlobsStorage(this.blobConnectionString, this.blobContainerName);
        return this
    }

    withCreateUserState(): this {
        if(!this.storage) {
            throw new Error('A implementação do método withCreateStorage() é obrigatório para este método!')
        }

        this.userState = new UserState(this.storage);
        return this
    }

    withCreateConversationState(): this {
        if(!this.storage) {
            throw new Error('A implementação do método withCreateStorage() é obrigatório para este método!')
        }

        this.conversationState = new ConversationState(this.storage);
        return this
    }

    getStorageState(): Storage {
        if(!this.storage) {
            throw new Error('A implementação do método withCreateStorage() é obrigatório para este método!')
        }

        return this.storage
    }

    getConversationState(): ConversationState {
        if(!this.storage) {
            throw new Error('A implementação do método withCreateConversationState() é obrigatório para este método!')
        }

        return this.conversationState
    }

    getUserState(): UserState {
        if(!this.storage) {
            throw new Error('A implementação do método withCreateUserState() é obrigatório para este método!')
        }

        return this.userState
    }
}