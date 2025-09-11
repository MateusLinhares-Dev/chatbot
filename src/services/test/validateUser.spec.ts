import { expect, test, vi } from "vitest";
import { UserValidator } from "../user/validateUser";
import { ActivityTypes, TeamsInfo, TurnContext } from "botbuilder";
import { UserService } from "../user/userService";


test('validate if user contain register with blob', async () => {
    const mockUserProfile = {
        id: "user1",
        email: "teste@teste.com",
        name: "Mateus"
    };

    const sendActivityMock = vi.fn();
    const context = new TurnContext(
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

    vi.spyOn(TeamsInfo, 'getMember').mockImplementation(async () => {
        return mockUserProfile
    });

    const parseSchemaUser = await UserService.getValidateUser(context);
    expect(parseSchemaUser).toEqual(mockUserProfile);
});