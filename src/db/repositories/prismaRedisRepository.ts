import { Redis } from "../../core/entities/redis";
import { IRedisRepository } from "../../core/repositories/IRedisRepository";
import { prisma } from "../datasources/prismaClient";

export class PrismaRedisRepository implements IRedisRepository {
  async create(userId: string): Promise<Redis> {
    const redis = await prisma.redis.create({
      data: {
        userId
      },
      include: {
        environments: {
          include: {
            databases: true
          }
        }
      }
    })
  
    return redis
  }

}