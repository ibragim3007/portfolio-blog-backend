import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const generateJwt = (data: User) => {
  return jwt.sign(data, process.env.JWT_SECRET || '', {
    expiresIn: '24h',
  });
};
