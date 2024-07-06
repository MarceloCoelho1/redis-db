export class Session {
  constructor(
    public id: string,
    public userId: string,
    public token: string,
    public expiresAt: Date
  ){}
}
