import { createClient, RedisClientType } from "redis";
import { env } from "../../services/env.js";

let client: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({ url: env.REDIS_URL });
    
    client.on("error", (err: Error) => {
      console.error("Redis connection error:", err);
    });

    await client.connect();
    console.log("Successfully connected to Redis");
  }
  return client;
}