import { Redis } from "../entities/redis";

export interface IRedisRepository {
  create(userId: string): Promise<Redis>;
}