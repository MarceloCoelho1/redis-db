import { FastifyReply, FastifyRequest } from "fastify";
import { RedisUsecases } from '../../../core/usecases/redis'


export class RedisController {

  constructor(
    private redisUsecases: RedisUsecases
  ) { }

  async createEnvironment(req: FastifyRequest, reply: FastifyReply) {
  
  }
}