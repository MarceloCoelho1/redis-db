export class Database {
  constructor(
    public id: string,
    public name: string,
    public host: string,
    public port: number,
    public password: string,
    public environmentId: string
  ) {}
}

