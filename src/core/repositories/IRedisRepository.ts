import { CreateEnvironmentDTO } from "../../infra/http/dtos/createEnvironment";
import { Database } from "../entities/database";
import { Environment } from "../entities/environment";
import { Redis } from "../entities/redis";
import { databaseType } from "../types/database";

export interface IRedisRepository {
  create(userId: string): Promise<Redis>;
  createEnvironment(data: CreateEnvironmentDTO): Promise<Environment>
  findRedisByUserId(userId: string): Promise<Redis | null>
  createDatabase(data: databaseType): Promise<Database>
  findEnvironmentById(id: string): Promise<Environment | null>
}