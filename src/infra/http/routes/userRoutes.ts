import { FastifyInstance } from "fastify";
import { UserUsecases } from "../../../core/usecases/user"; 
import { BcryptService } from "../../bcrypt"; 
import { UserController } from "../controller/userController";
import { JWTService } from "../../jwt"; 
import { PrismaUserRepository } from "../../../db/repositories/prismaUserRepository";
import { PrismaSessionRepository } from "../../../db/repositories/prismaSessionRepository";


export const userRoutes = (app: FastifyInstance): void => {
  const userRepository = new PrismaUserRepository()
  const sessionRepository = new PrismaSessionRepository()
  const bcryptService = new BcryptService()
  const jwtService = new JWTService()
  const userUsecases = new UserUsecases(userRepository, bcryptService, jwtService, sessionRepository)
  const userController = new UserController(userUsecases)

  app.post('/users', (req, reply) => userController.create(req, reply));
  app.post('/users/login', (req, reply) => userController.login(req, reply))

}