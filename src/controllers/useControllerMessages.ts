import { BlobStateFactory } from '../data/blobstorage'
import { EchoBot } from '../services/bot'
import { adapter } from '../services/botbuilder'
import { env } from '../services/env'

const storage = new BlobStateFactory(env.BlobConnectionString, env.BlobContainerName)
                    .withCreateStorage()
                    .withCreateUserState()
                    .withCreateConversationState()
                    
const userState = storage.getUserState()
const conversationState =  storage.getConversationState()

const myBot = new EchoBot(userState, conversationState)

export const MessageWebhookTeams = async (req, res) => {
    await adapter.process(req, res, (context) => myBot.run(context));
}