import { beforeEach, describe, expect, it, vi } from "vitest";
import { DispatchController } from "../user/dispatch.js";
import { DispatcherHandlerUser } from "../user/handlers/dispatcherUser.js";
import { ActivityTypes, MemoryStorage, StatePropertyAccessor, TeamsInfo, TurnContext, UserState } from "botbuilder";
import { userStateInfo } from "../../dto/interfaceInfoUserState.js";

describe("Test the adapter functionality", () => {
    let dispatch: DispatchController;
    let dispatcherUser: DispatcherHandlerUser;
    let useState: UserState;
    let profile: StatePropertyAccessor<userStateInfo>
    let context: TurnContext;

    beforeEach(() => {
        const storage = new MemoryStorage()
        useState = new UserState(storage)
        profile = useState.createProperty<userStateInfo>('UserProfile')

        dispatch = new DispatchController()
        dispatcherUser = new DispatcherHandlerUser(profile)

        const sendActivityMock = vi.fn();
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

    it("Register new handler e return method getHandler", async () => {
        vi.spyOn(TeamsInfo, "getMember").mockImplementation(async (_ctx, userId) => {
                    if(userId === "user1"){
                        return { id: userId, email: "teste@teste.com", name: "Mateus"}
                    }
                    throw new Error("Member not found!")
        })
        dispatch.registerHandler("user", dispatcherUser)
        await dispatch.getHandler(context, "user")
        const accessorProfile = await profile.get(context)
       
        expect(accessorProfile.name).toBe("Mateus")
        expect(accessorProfile.email).toBe("teste@teste.com")
    })
})

// TODO: Finalizar o teste da handler