import { EchoBot } from '../services/bot'
import { adapter } from '../services/botbuilder'

const myBot = new EchoBot()

export const MessageWebhookTeams = async (req, res) => {
    await adapter.process(req, res, (context) => myBot.run(context));
}