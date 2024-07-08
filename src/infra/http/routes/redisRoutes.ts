import { FastifyInstance } from "fastify";
import { RedisUsecases } from "../../../core/usecases/redis"; 
import { RedisController } from "../controller/redisController";
import { JWTService } from "../../jwt"; 
import { PrismaUserRepository } from "../../../db/repositories/prismaUserRepository";
import { authMiddleware } from "../middlewares/authMiddleware";
import { PrismaRedisRepository } from "../../../db/repositories/prismaRedisRepository";
import { RedisCache } from "../../../db/datasources/inMemory";


export const redisRoutes = (app: FastifyInstance): void => {
  const userRepository = new PrismaUserRepository()
  const redisRepository = new PrismaRedisRepository()
  const jwtService = new JWTService()
  const redisCache = new RedisCache()
  const redisUsecases = new RedisUsecases(userRepository, jwtService, redisRepository, redisCache)
  const redisController = new RedisController(redisUsecases)

  app.post('/api/create-environment', 
    { preHandler: [authMiddleware] },
    (req, reply) => redisController.createEnvironment(req, reply)
  )
  app.post('/api/create/database',
    { preHandler: [authMiddleware] },
    (req, reply) => redisController.createDatabase(req, reply)
  )
  app.post('/api/cache/set', { preHandler: [authMiddleware] },
    (req, reply) => redisController.setRedisCache(req, reply))
  app.post('/api/cache/get', { preHandler: [authMiddleware] },
    (req, reply) => redisController.getRedisCache(req, reply))
}