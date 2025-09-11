import { ActivityHandler, ConversationState, TurnContext, UserState, StatePropertyAccessor } from 'botbuilder';
import { userStateInfo } from '../../dto/interfaceInfoUserState';
import { UserService } from '../user/userService';


export class EchoBot extends ActivityHandler {
    private UserState: UserState;
    private ConversationState: ConversationState;
    private userProfileAccessor: StatePropertyAccessor<userStateInfo>;

    constructor(UserState: UserState, ConversationState: ConversationState) {
        super();
        this.UserState = UserState;
        this.ConversationState = ConversationState;
        this.userProfileAccessor = this.UserState.createProperty<userStateInfo>('UserProfile');
        
        this.onMessage(async (context, next) => {
            let profile = await this.userProfileAccessor.get(context, {id: context.activity.from.id })
            
            try {
                const user = await UserService.getValidateUser(context);

                profile.email = user.email;
                profile.name = user.name;
            } catch (err) {
                throw new Error('Este usuário não possui e-mail.')
            }

            await this.userProfileAccessor.set(context, profile);
            await context.sendActivity(`Olá ${profile.name}`)
            await next();
        });
    }

    async run(context: TurnContext): Promise<void> {
        await super.run(context);

        await this.ConversationState.saveChanges(context, false)
        await this.UserState.saveChanges(context, false)
    }
}
