import { Redis } from "./redis";
import { Session } from "./session";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public Session: Session[],
    public redis?: Redis,
  ) {}
}

