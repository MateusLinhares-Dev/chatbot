import {
    CloudAdapter,
    ConfigurationServiceClientCredentialFactory,
    createBotFrameworkAuthenticationFromConfiguration
} from 'botbuilder';
import { env } from '../env.js'

const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: env.MicrosoftAppId,
    MicrosoftAppPassword: env.MicrosoftAppPassword,
    MicrosoftAppTenantId: env.MicrosoftAppTenantId,
    MicrosoftAppType: "SingleTenant"
});

const botFrameworkAuthentication = createBotFrameworkAuthenticationFromConfiguration(null, credentialsFactory);

const adapter = new CloudAdapter(botFrameworkAuthentication);
const streamingAdapter = new CloudAdapter(botFrameworkAuthentication)

const onTurnErrorHandler = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error:`, error);

    const restError = (error.cause ?? error);

    if (restError?.request?.headers?.authorization) {
        console.log("Authorization header:", restError.request.headers.authorization);
    } else {
        console.log("Authorization header not found. Full request dump:", JSON.stringify(restError?.request, null, 2));
    }

    if (restError?.response) {
        console.log("Response dump:", {
            status: restError.response.status,
            headers: restError.response.headers,
            body: restError.response.bodyAsText
        });
    }

    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    await context.sendActivity('❌ O bot encontrou um erro de autenticação.');
};

adapter.onTurnError = onTurnErrorHandler;
streamingAdapter.onTurnError = onTurnErrorHandler;

export { adapter, streamingAdapter };