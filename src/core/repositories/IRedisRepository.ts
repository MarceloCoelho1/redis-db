import { CreateEnvironmentDTO } from "../../infra/http/dtos/createEnvironment";
import { Environment } from "../entities/environment";
import { Redis } from "../entities/redis";

export interface IRedisRepository {
  create(userId: string): Promise<Redis>;
  createEnvironment(data: CreateEnvironmentDTO): Promise<Environment>
  findRedisByUserId(userId: string): Promise<Redis | null>
}