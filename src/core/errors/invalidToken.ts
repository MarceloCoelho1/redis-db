import { CustomError } from './customError';

export class InvalidToken extends CustomError {
  constructor() {
    super('Invalid token', 400);
  }
}