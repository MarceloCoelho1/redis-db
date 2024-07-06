import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserSchema } from "../schemas/registerUserSchema";
import { UserAlreadyExists } from "../../../core/errors/userAlreadyExists";
import { RegisterUserDTO } from "../dtos/registerUserDTO";
import { UserUsecases } from "../../../core/usecases/user";
import { UserNotExists } from "../../../core/errors/userNotExists";
import { InvalidPassword } from "../../../core/errors/invalidPassword";
import { LoginUserDTO } from "../dtos/loginUserDTO";
import { LoginUserSchema } from "../schemas/loginUserSchema";



export class UserController {
    constructor(
        private userUsecases: UserUsecases
    ) { }

    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const userAgnt = req.headers["user-agent"]

            if(!userAgnt) {
                return reply.status(500).send({ error: 'especify user-agent header' });
            }
            const createUserData = req.body as RegisterUserDTO
            const result = RegisterUserSchema.safeParse(createUserData)

            if (!result.success) {
                return reply.status(400).send({ errors: result.error.errors })
            }

            const token = await this.userUsecases.create(createUserData, userAgnt)
            reply.status(201).send({ token: token })
        } catch (error) {
            if (error instanceof UserAlreadyExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {

            const userAgnt = req.headers["user-agent"]

            if(!userAgnt) {
                return reply.status(500).send({ error: 'especify user-agent header' });
            }

            const loginUserData = req.body as LoginUserDTO
            const result = LoginUserSchema.safeParse(loginUserData)

            if (!result.success) {
                return reply.status(400).send({ errors: result.error.errors })
            }
            const token = await this.userUsecases.login(loginUserData, userAgnt)
            reply.status(201).send({ token: token })

        } catch (error) {
            if (error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof InvalidPassword) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

}