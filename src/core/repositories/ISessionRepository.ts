import { Session } from "../entities/session";
import { SessionDTO } from "../../infra/http/dtos/sessionDTO"

export interface ISessionRepository {
  create(data: SessionDTO): Promise<Session>;
  update(updateData: SessionDTO): Promise<Session>;
}