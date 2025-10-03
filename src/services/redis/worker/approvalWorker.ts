import { Worker } from "bullmq";
import { getRedisClient } from "../../../infrastructure/redis/redisClient.js";
import { approvalQueue } from "../../../infrastructure/queue/approvalQueue.js";
import { env } from "../../env.js";
import { adapter } from "../../bot/botbuilder.js";
import { TurnContext } from "botbuilder";

const MAX_ATTEMPTS = 5;
const TTL_MS = 60 * 15 * 1000;

const client = await getRedisClient();

export const approvalWorker = new Worker(
  "approvalQueue",
  async (job) => {
    const { userId, attempt } = job.data;

    const data = await client.hGetAll(`approval:${userId}`);
    if (!data) return;

    if (data.status === "approved") return;

    const conversationReference = JSON.parse(data.conversationReference);

    if (attempt < MAX_ATTEMPTS) {
      await adapter.continueConversationAsync(
        env.MicrosoftAppId!,
        conversationReference,
        async (turnContext: TurnContext) => {
            await turnContext.sendActivity(
            "📢 *Recordatorio*: Por favor recuerde aprobar la solicitud haciendo clic en el botón de aprobación."
          );
        }
      );

      await client.hSet(`approval:${userId}`, {
        attempts: (attempt + 1).toString(),
      });

      await approvalQueue.add(
        "approval-expiration",
        { userId, attempt: attempt + 1 },
        { delay: TTL_MS }
      );
    } else {
      console.log(`${userId} não respondeu após ${MAX_ATTEMPTS} tentativas → Auto-aprovando`);

      await client.hSet(`approval:${userId}`, {
        status: "auto-approved",
      });
    }
  },
  { connection: { url: env.REDIS_URL } }
);