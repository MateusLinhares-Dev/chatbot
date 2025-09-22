import { ActivityHandler, ConversationState, TurnContext, UserState, StatePropertyAccessor } from 'botbuilder';
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
        
        this.dispatcher = new DispatchController()
        this.dispatcher.registerHandler('user', new DispatcherHandlerUser(this.userProfileAccessor));

        this.onMessage(async (context, next) => {
            try {
                const profile = await this.dispatcher.getHandler(context, 'user');
                await context.sendActivity(`Olá ${profile.name}`);
            } catch (err: any) {
                throw new UserDataError('Error invalid user!', err as Error);
            }


            await next();
        });
        
    }

    protected async onInvokeActivity(context: TurnContext): Promise<any> {
        console.log('entrei no on')
        if (context.activity.name === 'adaptiveCard/action') {
            const action = context.activity.value;
            console.log("🔘 Botão clicado:", action);

            if (action.verb === "avancar") {
                await context.sendActivity("✅ Você clicou em avançar!");

                const profile = await this.userProfileAccessor.get(context, {} as userStateInfo);
                // profile.responded = true;
                await this.userProfileAccessor.set(context, profile);
            }
        }

        return await super.onInvokeActivity(context);
    }

    async run(context: TurnContext): Promise<void> {
        await super.run(context);

        await this.ConversationState.saveChanges(context, false)
        await this.UserState.saveChanges(context, false)
    }
}
