import { ActivityHandler, ConversationState, TurnContext, UserState, StatePropertyAccessor } from 'botbuilder';
import { userStateInfo } from '../../dto/interfaceInfoUserState.js';
import { DispatcherHandlerUser } from '../user/handlers/dispatcherUser.js';
import { DispatchController } from '../user/dispatch.js';
import { UserDataError } from "../../domain/error/UserError.js";
import { ExecuteApiError } from '../../domain/error/RequestApiSoapError.js';
import { GetOidForEntityRecordAndModifyFieldRespuestaWithApi } from '../redis/approvalService.js';

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
            try {
                const profile = await this.dispatcher.getHandler(context, 'user');
                await context.sendActivity(`Olá ${profile.name}`);
            } catch (err: any) {
                console.log(err)
                throw new UserDataError(`Error invalid user: ${err}`, err as Error);
            }

            await next();
        });

        this.onInvokeActivity = async (context) => {
            try {
                if (context.activity.name === 'adaptiveCard/action') {
                    const actionData = context.activity.value?.action?.data;
                    if (actionData?.actions === "Informo") {
                        const workflowId = actionData.workflowId
                        const registrationUser = actionData.registrationUser

                        await GetOidForEntityRecordAndModifyFieldRespuestaWithApi(registrationUser, workflowId) 
                        
                        await context.sendActivity("✅ Tarefa marcada como finalizada!");
                    }

                    return { status: 200 };
                }

                return { status: 200 };
            } catch (error) {
                throw new ExecuteApiError(
                    `Error ao registrar ação do usuário, ${error}`, 
                    error as Error
                );
            }
        };
    }

    async run(context: TurnContext): Promise<void> {
        await super.run(context);

        await this.ConversationState.saveChanges(context, false);
        await this.UserState.saveChanges(context, false);
    }
}
