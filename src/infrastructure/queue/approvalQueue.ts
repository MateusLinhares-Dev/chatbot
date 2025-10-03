import { Queue } from "bullmq";
import { env } from "../../services/env.js";

export const approvalQueue = new Queue("approvalQueue", {
  connection: {
    url: env.REDIS_URL,
  },
});