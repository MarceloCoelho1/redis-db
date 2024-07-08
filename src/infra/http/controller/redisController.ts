import { FastifyReply, FastifyRequest } from "fastify";
import { RedisUsecases } from '../../../core/usecases/redis'
import { createEnvironmentSchema } from "../schemas/createEnvironmentSchema";
import { UserNotExists } from "../../../core/errors/userNotExists";
import { InvalidToken } from "../../../core/errors/invalidToken";
import { createDatabaseSchema } from "../schemas/createDatabaseSchema";
import { SetRedisCacheSchema } from "../schemas/setRedisCacheSchema";
import { GetRedisCacheSchema } from "../schemas/getRedisCacheSchema";


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

  async setRedisCache(req: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = req.headers['authorization'];
      const secretKey = req.headers['x-secret-key'] as string;
      if(!secretKey) {
        return reply.status(401).send({ message: 'Missing secret-key' });
      }

      if (!authHeader) {
        return reply.status(401).send({ message: 'Missing token' });
      }
      const token = authHeader.split(' ')[1];


      const result = SetRedisCacheSchema.safeParse(req.body);

      if (!result.success) {
        return reply.status(400).send({ errors: result.error.errors });
      }

      let dataDTO = {
        secretKey,
        token,
        dbUrl: result.data.dbUrl,
        key: result.data.key,
        obj: {
          ...result.data.value
        }

      }

      const bool = await this.redisUsecases.setRedisCache(dataDTO);
      reply.status(201).send({ "msg": "data inserted!" });

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

  async getRedisCache(req: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = req.headers['authorization'];
      const secretKey = req.headers['x-secret-key'] as string;
      if(!secretKey) {
        return reply.status(401).send({ message: 'Missing secret-key' });
      }

      if (!authHeader) {
        return reply.status(401).send({ message: 'Missing token' });
      }
      const token = authHeader.split(' ')[1];


      const result = GetRedisCacheSchema.safeParse(req.body);

      if (!result.success) {
        return reply.status(400).send({ errors: result.error.errors });
      }

      let dataDTO = {
        secretKey,
        token,
        dbUrl: result.data.dbUrl,
        key: result.data.key,

      }

      const obj = await this.redisUsecases.getRedisCache(dataDTO);
      reply.status(201).send({ "obj": obj });

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