import { RegisterUserDTO } from "../../infra/http/dtos/registerUserDTO";
import { User } from "../entities/user";

export interface IUserRepository {
  create(data: RegisterUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}