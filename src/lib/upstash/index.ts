export * from "./api";
export * from "./validation";
import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

// maybe call the folder `upstash-redis` to distinguish with kafka
