import { ActivityHandler, ConversationState, TurnContext, UserState, StatePropertyAccessor, InvokeResponse } from 'botbuilder';
import { userStateInfo } from '../../dto/interfaceInfoUserState';
import { DispatcherHandlerUser } from '../user/handlers/dispatcherUser';
import { DispatchController } from '../user/dispatch';
import { UserDataError } from "../../domain/error/UserError";

export class EchoBot extends ActivityHandler {
    private UserState: UserState;
    private ConversationState: ConversationState;
    private userProfileAccessor: StatePropertyAccessor<userStateInfo>;
    private dispatcher: DispatchController;

    constructor(UserState: UserState, ConversationState: ConversationState) {
        super();
        this.UserState = UserState;
        this.ConversationState = ConversationState;
        this.userProfileAccessor = this.UserState.createProperty<userStateInfo>('UserProfile');
        
        this.dispatcher = new DispatchController();
        this.dispatcher.registerHandler('user', new DispatcherHandlerUser(this.userProfileAccessor));

        this.onMessage(async (context, next) => {
            console.log(context.activity)
            try {
                const profile = await this.dispatcher.getHandler(context, 'user');
                await context.sendActivity(`Olá ${profile.name}`);
            } catch (err: any) {
                throw new UserDataError('Error invalid user!', err as Error);
            }

            await next();
        });

        this.onInvokeActivity = async (context) => {
            if (context.activity.name === 'adaptiveCard/action') {
                const actionData = context.activity.value?.action?.data;
                if (actionData?.actions === "Informo") {
                    await context.sendActivity("✅ Tarefa marcada como finalizada!");
                }

                return { status: 200 };
            }

            return { status: 200 };
        };
    }

    async run(context: TurnContext): Promise<void> {
        await super.run(context);

        await this.ConversationState.saveChanges(context, false);
        await this.UserState.saveChanges(context, false);
    }
}
