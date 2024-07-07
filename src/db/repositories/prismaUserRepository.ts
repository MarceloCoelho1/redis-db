import { User } from "../../core/entities/user";
import { IUserRepository } from "../../core/repositories/IUserRepository";
import { RegisterUserDTO } from "../../infra/http/dtos/registerUserDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaUserRepository implements IUserRepository {
  async create(data: RegisterUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data,
      include: {
        Session: true
      }
    })
  
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        Session: true,
      }
    })
  
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        Session: true,
      }
    })

    return user
  }
}