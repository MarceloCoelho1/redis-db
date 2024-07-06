import { CustomError } from './customError';

export class RedisAlreadyExists extends CustomError {
  constructor() {
    super('Redis Already Exists', 409);
  }
}