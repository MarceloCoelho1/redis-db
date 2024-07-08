export type SetRedisCacheDTO = {
  secretKey: string;
  dbUrl: string;
  token: string;
  key: string;
  obj: {
    userId: string;
    name: string;
  }
}