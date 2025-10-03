import { ConversationReference } from "botbuilder";
import { Approval } from "../../domain/approvalRedis/InterfaceApproval.js";
import { approvalQueue } from "../../infrastructure/queue/approvalQueue.js";
import { getRedisClient } from "../../infrastructure/redis/redisClient.js";
import { WrapperExecuteGetOidForms } from "../api/rest/GetConsumerApiRestOid.js";
import { apiEntityRecord } from "../api/soap/ApiEditEntityRecord.js";

const TTL_MS = 60 * 15 * 1000;
const client = await getRedisClient();

export async function requestApproval(
  userId: string,
  conversationReference: ConversationReference
) {
  const approval: Approval = { 
    userId, 
    status: "pending", 
    attempts: 1 
  };

  await client.hSet(`approval:${userId}`, {
    status: approval.status,
    attempts: approval.attempts.toString(),
    conversationReference: JSON.stringify(conversationReference)
  });

  await approvalQueue.add(
    "approval-expiration",
    { userId, attempt: 1 },
    { delay: TTL_MS }
  );
}

export async function GetOidForEntityRecordAndModifyFieldRespuestaWithApi(
  userId: string, 
  workflowId: string
) {
  const workflowOid = await WrapperExecuteGetOidForms(workflowId);
  await apiEntityRecord(workflowId, workflowOid);

  await client.hSet(`approval:${userId}`, { status: "approved" });
}
