import { beforeEach, describe, expect, it, vi } from "vitest";
import { EchoBot } from "../bot/bot";
import { ActivityTypes, ConversationState, MemoryStorage, TeamsInfo, TurnContext, UserState } from "botbuilder";


describe("Echobot", () => {
    let bot: EchoBot;
    let context: any;
    let sendActivityMock: any;

    beforeEach(()=>{
        const storage = new MemoryStorage()
        const userState = new UserState(storage)
        const conversationState = new ConversationState(storage)

        bot = new EchoBot(userState, conversationState)

        sendActivityMock = vi.fn()
        // MOCK DOS DADOS DO CONTEXT DO BOT.
        context = new TurnContext(
            {
                sendActivities: async (_ctx, activities) => {
                    activities.forEach(a => sendActivityMock(a.text));
                    return [];
                },
                updateActivity: async () => ({ id: "1" }),
                deleteActivity: async () => {}
            } as any,
            {
                type: ActivityTypes.Message,
                channelId: "msteams",
                from: {
                    id: "user1",
                    name: "Mateus"
                },
                text: "Olá bot!"
            }
        );
    })

    it('Response for user with fullname ex: Olá <username>', async () => {
        vi.spyOn(TeamsInfo, "getMember").mockImplementation(async (_ctx, userId) => {
            if(userId === "user1"){
                return { id: userId, email: "teste@teste.com", name: "Mateus"}
            }
            throw new Error("Member not found!")
        })

        await bot.run(context)

        expect(sendActivityMock).toHaveBeenCalledWith("Olá Mateus");
    })

    it('If name or email not exist, return Error: "Este usuário não possui e-mail"', async () => {
        vi.spyOn(TeamsInfo, "getMember").mockRejectedValue(new Error('Not e-mail'))

        await expect(bot.run(context)).rejects.toThrow('Este usuário não possui e-mail.')
    })
})