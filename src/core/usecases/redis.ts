import { InvalidToken } from "../errors/invalidToken";
import { RedisAlreadyExists } from "../errors/redisAlreadyExists";
import { UserNotExists } from "../errors/userNotExists";
import { IRedisRepository } from "../repositories/IRedisRepository";
import { ISessionRepository } from "../repositories/ISessionRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IJwtService } from "../services/IJwtService";

export class RedisUsecases {
  constructor(
    private userRepository: IUserRepository,
    private jwtRepository: IJwtService,
    private redisRepository: IRedisRepository
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


}