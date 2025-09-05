import { EchoBot } from '../services/bot'
import { INodeSocket } from 'botframework-streaming';
import { streamingAdapter } from '../services/botbuilder'

const myBot = new EchoBot()

export const UpgradeBotbuilder = async (req, socket, head) => {
    await streamingAdapter.process(req, socket as unknown as INodeSocket, head, (context) => myBot.run(context));
}