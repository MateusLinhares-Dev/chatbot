import {
    CloudAdapter,
    ConfigurationServiceClientCredentialFactory,
    createBotFrameworkAuthenticationFromConfiguration
} from 'botbuilder';
import { env } from './env'

const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: env.MicrosoftAppId,
    MicrosoftAppPassword: env.MicrosoftAppPassword
});

const botFrameworkAuthentication = createBotFrameworkAuthenticationFromConfiguration(null, credentialsFactory);

const adapter = new CloudAdapter(botFrameworkAuthentication);
const streamingAdapter = new CloudAdapter(botFrameworkAuthentication)

const onTurnErrorHandler = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${ error }`);

    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

adapter.onTurnError = onTurnErrorHandler;
streamingAdapter.onTurnError = onTurnErrorHandler;

export { adapter, streamingAdapter };