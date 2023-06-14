export * from "./api";
export * from "./validation";
import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();
