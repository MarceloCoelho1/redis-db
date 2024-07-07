import { FastifyInstance } from "fastify";
import { RedisUsecases } from "../../../core/usecases/redis"; 
import { RedisController } from "../controller/redisController";
import { JWTService } from "../../jwt"; 
import { PrismaUserRepository } from "../../../db/repositories/prismaUserRepository";
import { authMiddleware } from "../middlewares/authMiddleware";
import { PrismaRedisRepository } from "../../../db/repositories/prismaRedisRepository";


export const redisRoutes = (app: FastifyInstance): void => {
  const userRepository = new PrismaUserRepository()
  const redisRepository = new PrismaRedisRepository()
  const jwtService = new JWTService()
  const redisUsecases = new RedisUsecases(userRepository, jwtService, redisRepository)
  const redisController = new RedisController(redisUsecases)

  app.post('/api/create-environment', 
    { preHandler: [authMiddleware] },
    (req, reply) => redisController.createEnvironment(req, reply)
  );

}