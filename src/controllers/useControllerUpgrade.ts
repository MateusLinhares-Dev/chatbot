import { EchoBot } from '../services/bot/bot'
import { INodeSocket } from 'botframework-streaming';
import { streamingAdapter } from '../services/bot/botbuilder'
import { BlobStateFactory } from '../data/blobstorage';
import { env } from '../services/env';

const storage = new BlobStateFactory(env.BlobConnectionString, env.BlobContainerName)
                    .withCreateStorage()
                    .withCreateUserState()
                    .withCreateConversationState()
                    
const userState = storage.getUserState()
const conversationState =  storage.getConversationState()

const myBot = new EchoBot(userState, conversationState)

export const UpgradeBotbuilder = async (req, socket, head) => {
    await streamingAdapter.process(req, socket as unknown as INodeSocket, head, (context) => myBot.run(context));
}