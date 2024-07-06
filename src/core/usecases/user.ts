import { UserAlreadyExists } from "../errors/userAlreadyExists";
import { RegisterUserDTO } from "../../infra/http/dtos/registerUserDTO";
import { User } from "../entities/user";
import { LoginUserDTO } from "../../infra/http/dtos/loginUserDTO";
import { UserNotExists } from "../errors/userNotExists";
import { InvalidPassword } from "../errors/invalidPassword";
import { IUserRepository } from "../repositories/IUserRepository";
import { IBcryptService } from "../services/IBcryptService";
import { IJwtService } from "../services/IJwtService";
import { ISessionRepository } from "../repositories/ISessionRepository";

export class UserUsecases {
    constructor(
        private userRepository: IUserRepository,
        private bcryptRepository: IBcryptService,
        private jwtRepository: IJwtService,
        private sessionRepository: ISessionRepository
    ) { }

    async create(data: RegisterUserDTO, userAgnt: string): Promise<string> {
        const user = await this.userRepository.findByEmail(data.email)

        if (user) {
            throw new UserAlreadyExists()
        }

        const passwordHashed = await this.bcryptRepository.hash(data.password)

        const userData = {
            ...data,
            password: passwordHashed
        }

        const createdUser = await this.userRepository.create(userData)

        const timeToExpires = 2
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + timeToExpires)
        const token = this.jwtRepository.sign({ userId: createdUser.id }, timeToExpires)

        let sessionData = {
            userId: createdUser.id,
            token,
            expiresAt,
            userAgnt
        }

        await this.sessionRepository.create(sessionData)

        return token;

    }

    async login(data: LoginUserDTO, userAgnt: string): Promise<string> {
        const user = await this.userRepository.findByEmail(data.email)

        if (!user) {
            throw new UserNotExists()
        }

        const correctPassword = await this.bcryptRepository.compare(data.password, user.password)

        if (!correctPassword) {
            throw new InvalidPassword()
        }


        const timeToExpires = 2
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + timeToExpires)
        const token = this.jwtRepository.sign({ userId: user.id }, timeToExpires)

        let sessionData = {
            userId: user.id,
            token,
            expiresAt,
            userAgnt
        }

        await this.sessionRepository.update(sessionData)

        return token

    }

}