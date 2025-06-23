import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: number;
      email: string;
      name: string;
      iat?: number;
      exp?: number;
    };
  }
}
