import { FastifyReply, FastifyRequest } from "fastify";
import { RedisUsecases } from '../../../core/usecases/redis'
import { createEnvironmentSchema } from "../schemas/createEnvironmentSchema";
import { UserNotExists } from "../../../core/errors/userNotExists";
import { InvalidToken } from "../../../core/errors/invalidToken";
import { createDatabaseSchema } from "../schemas/createDatabaseSchema";


export class RedisController {

  constructor(
    private redisUsecases: RedisUsecases
  ) { }

  async createEnvironment(req: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return reply.status(401).send({ message: 'Missing token' });
      }
      const token = authHeader.split(' ')[1];

      const result = createEnvironmentSchema.safeParse(req.body)

      if (!result.success) {
        return reply.status(400).send({ errors: result.error.errors })
      }

      const environment = await this.redisUsecases.createEnvironment(result.data.name, token)
      reply.status(201).send({ environment: environment })

    } catch (error) {
      if (error instanceof UserNotExists) {
        reply.status(error.statusCode).send({ error: error.message });
      } else if (error instanceof InvalidToken) {
        reply.status(error.statusCode).send({ error: error.message });
      } else {
        reply.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }

  async createDatabase(req: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return reply.status(401).send({ message: 'Missing token' });
      }
      const token = authHeader.split(' ')[1];

      const result = createDatabaseSchema.safeParse(req.body);

      if (!result.success) {
        return reply.status(400).send({ errors: result.error.errors });
      }
      
      const database = await this.redisUsecases.createDatabase(token, result.data);
      reply.status(201).send({ database });

    } catch (error) {
      if (error instanceof UserNotExists) {
        reply.status(error.statusCode).send({ error: error.message });
      } else if (error instanceof InvalidToken) {
        reply.status(error.statusCode).send({ error: error.message });
      } else {
        reply.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}