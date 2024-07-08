export class Database {
  constructor(
    public id: string,
    public name: string,
    public host: string,
    public username: string,
    public isActive: boolean,
    public port: number,
    public dbUrl: string,
    public password: string,
    public secretKey: string,
    public environmentId: string
  ) {}
}

