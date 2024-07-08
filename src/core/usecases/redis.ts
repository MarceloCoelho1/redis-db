import { RedisCache } from "../../db/datasources/inMemory";
import { CreateDatabaseDTO } from "../../infra/http/dtos/createDatabaseDTO";
import { GetDbSizeRedisCacheDTO } from "../../infra/http/dtos/getDbSizeRedisCacheDTO";
import { GetRedisCacheDTO } from "../../infra/http/dtos/getRedisCacheDTO";
import { SetRedisCacheDTO } from "../../infra/http/dtos/setRedisCacheDTO";
import { InvalidToken } from "../errors/invalidToken";
import { RedisAlreadyExists } from "../errors/redisAlreadyExists";
import { UserNotExists } from "../errors/userNotExists";
import { IRedisRepository } from "../repositories/IRedisRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IJwtService } from "../services/IJwtService";
import { v4 as uuidv4 } from 'uuid';

export class RedisUsecases {
  constructor(
    private userRepository: IUserRepository,
    private jwtRepository: IJwtService,
    private redisRepository: IRedisRepository,
    private redisCache: RedisCache
  ) { }

  async create(token: string) {

    const decoded = this.jwtRepository.verify(token); 
    if (!decoded) {
      throw new InvalidToken()
    }
    const user = await this.userRepository.findById(decoded.userId)

    if(!user) {
      throw new UserNotExists()
    }
    if(user.redis) {
      throw new RedisAlreadyExists()
    }

    return await this.redisRepository.create(user.id)

  }

  async createEnvironment(name: string, token: string) {
    const decoded = this.jwtRepository.verify(token); 
    if (!decoded) {
      throw new InvalidToken()
    }
    const user = await this.userRepository.findById(decoded.userId)

    if(!user) {
      throw new UserNotExists()
    }

    const userRedis = await this.redisRepository.findRedisByUserId(user.id)

    if(!userRedis) {
      throw new Error("internal server Error!")
    }

    let data = {
      name,
      redisId: userRedis.id
    }
    return await this.redisRepository.createEnvironment(data)
  }

  async createDatabase(token: string, data: CreateDatabaseDTO) {
    const decoded = this.jwtRepository.verify(token);
    if (!decoded) {
      throw new InvalidToken();
    }

    const user = await this.userRepository.findById(decoded.userId);
    if (!user) {
      throw new UserNotExists();
    }

    const userRedis = await this.redisRepository.findRedisByUserId(user.id);
    if (!userRedis) {
      throw new Error("Internal Server Error!");
    }
    const environment = await this.redisRepository.findEnvironmentById(data.environmentId);
    if (!environment || environment.redisId !== userRedis.id) {
      throw new Error("Environment not found or does not belong to the user's Redis.");
    }

    const secretKey = uuidv4(); 
    const urlDatabase = `${environment.name}://${data.username}:${data.password}@${data.host}:${data.port}/${data.name}`

    const databaseData = {
      ...data,
      secretKey,
      isActive: true,
      dbUrl: urlDatabase
    };

    return await this.redisRepository.createDatabase(databaseData);
  }

  async setRedisCache(data: SetRedisCacheDTO) {
    const decoded = this.jwtRepository.verify(data.token);
    if (!decoded) {
      throw new InvalidToken();
    }

    const user = await this.userRepository.findById(decoded.userId);
    if (!user) {
      throw new UserNotExists();
    }

    const userRedis = await this.redisRepository.findRedisByUserId(user.id);
    if (!userRedis) {
      throw new Error("Internal Server Error!");
    }

    return this.redisCache.set(data.secretKey, data.dbUrl, data.key, data.obj)

  }

  async getRedisCache(data: GetRedisCacheDTO) {
    const decoded = this.jwtRepository.verify(data.token);
    if (!decoded) {
      throw new InvalidToken();
    }

    const user = await this.userRepository.findById(decoded.userId);
    if (!user) {
      throw new UserNotExists();
    }

    const userRedis = await this.redisRepository.findRedisByUserId(user.id);
    if (!userRedis) {
      throw new Error("Internal Server Error!");
    }

    return this.redisCache.get(data.secretKey, data.dbUrl, data.key)

  }

  async getDbSizeRedisCache(data: GetDbSizeRedisCacheDTO) {
    const decoded = this.jwtRepository.verify(data.token);
    if (!decoded) {
      throw new InvalidToken();
    }

    const user = await this.userRepository.findById(decoded.userId);
    if (!user) {
      throw new UserNotExists();
    }

    const userRedis = await this.redisRepository.findRedisByUserId(user.id);
    if (!userRedis) {
      throw new Error("Internal Server Error!");
    }

    return this.redisCache.getDbSize(data.secretKey, data.dbUrl)

  }



}