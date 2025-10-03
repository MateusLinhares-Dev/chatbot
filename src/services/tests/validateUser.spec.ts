import { expect, test, vi } from "vitest";
import { ActivityTypes, TeamsInfo, TurnContext } from "botbuilder";
import { UserService } from "../user/userService.js";

import z from "zod";

test('validate if user contain register with blob, if contain return info then user', async () => {
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

test('validate if user not contain register with blob, if not contain return Exception UserDataError', async () => {
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
        return { id: "user1", name: "Mateus" }
    });

    await expect(UserService.getValidateUser(context)).rejects
        .toThrow(z.ZodError);

});