import { Environment } from "../../core/entities/environment";
import { Redis } from "../../core/entities/redis";
import { IRedisRepository } from "../../core/repositories/IRedisRepository";
import { CreateEnvironmentDTO } from "../../infra/http/dtos/createEnvironment";
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

  async createEnvironment(data: CreateEnvironmentDTO): Promise<Environment> {
    const environment = await prisma.environment.create({
      data,
      include: {
        databases: true
      }
    })

    return environment
  }

  async findRedisByUserId(userId: string): Promise<Redis | null> {
    const redis = await prisma.redis.findUnique({
      where: {
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