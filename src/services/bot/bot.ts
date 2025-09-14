import { ActivityHandler, ConversationState, TurnContext, UserState, StatePropertyAccessor } from 'botbuilder';
import { userStateInfo } from '../../dto/interfaceInfoUserState';
import { DispatcherHandlerUser } from '../user/dispatcherUser';
import { DispatchController } from '../user/dispatch';


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
                throw new Error(err.message);
            }


            await next();
        });
    }

    async run(context: TurnContext): Promise<void> {
        await super.run(context);

        await this.ConversationState.saveChanges(context, false)
        await this.UserState.saveChanges(context, false)
    }
}
