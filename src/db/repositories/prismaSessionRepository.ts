import { Session } from "../../core/entities/session";
import { ISessionRepository } from "../../core/repositories/ISessionRepository";
import { SessionDTO } from "../../infra/http/dtos/sessionDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaSessionRepository implements ISessionRepository {
  async create(data: SessionDTO): Promise<Session> {
    const session = await prisma.session.create({
      data
    })
  
    return session
  }

  async update(updateData: SessionDTO): Promise<Session> {
    const session = await prisma.session.update({
      where: {
        userId: updateData.userId,
        userAgnt: updateData.userAgnt
      },
      data: {
        token: updateData.token,
        expiresAt: updateData.expiresAt
      }
    })

    return session
  }
}