import { FastifyRequest, FastifyReply } from 'fastify';
import { JWTService } from '../../jwt';
import { PrismaSessionRepository } from '../../../db/repositories/prismaSessionRepository';

interface AuthenticatedRequest extends FastifyRequest {
  user: { id: string };
}

const jwtService = new JWTService();
const sessionRepository = new PrismaSessionRepository()

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authHeader = request.headers['authorization'];
    const userAgent = request.headers['user-agent'];

    if (!authHeader || !userAgent) {
      return reply.status(401).send({ message: 'Missing token or user agent' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwtService.verify(token); 
    if (!decoded) {
      return reply.status(401).send({ message: 'Invalid token' });
    }

    const session = await sessionRepository.findByIdAndUser(decoded.userId, userAgent)

    if(!session) {
      return reply.status(401).send({ message: 'Session not found!' });
    }

    if(session.expiresAt < new Date()) {
      return reply.status(401).send({ message: 'expired session' });
    }

    (request as AuthenticatedRequest).user = { id: decoded.userId };
  } catch (err) {
    reply.status(500).send({ message: 'Internal Server Error' });
  }
}
