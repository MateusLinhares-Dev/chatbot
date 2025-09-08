import { BlobsStorage } from "botbuilder-azure-blobs";
import { UserState, ConversationState } from "botbuilder";
import { env } from "../services/env"


export class CreateStateUserConversation {
    private blobConnectionString: string;
    private blobContainerName: string

    constructor(blobConnectionString: string, blobContainerName: string) {
        this.blobConnectionString = blobConnectionString;
        this.blobContainerName = blobContainerName;
    }

    connectBlobStorage (): BlobsStorage  {
        const storageBotTeams = new BlobsStorage(
            this.blobConnectionString,
            this.blobContainerName
        )

        return storageBotTeams
    }

    createUseState(storageBotTeams) {
        const userState = new UserState(storageBotTeams)
    }

    createConversationState(storageBotTeams) {
        const conversationState = new ConversationState(storageBotTeams)
    }
}

// TODO: Finalizar a construção da instancia do blobstorage