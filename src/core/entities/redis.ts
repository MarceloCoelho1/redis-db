import { Environment } from "./environment";

export class Redis {
  constructor(
    public id: string,
    public userId: string,
    public environments: Environment[]
  ) {}
}
