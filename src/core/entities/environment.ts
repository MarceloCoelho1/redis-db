import { Database } from "./database";

export class Environment {
  constructor(
    public id: string,
    public name: string,
    public redisId: string,
    public databases: Database[]
  ) {}
}

