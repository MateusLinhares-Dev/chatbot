import { BlobStateFactory } from '../data/blobstorage.js'
import { EchoBot } from '../services/bot/bot.js'
import { adapter } from '../services/bot/botbuilder.js'
import { env } from '../services/env.js'

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