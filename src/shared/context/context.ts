import { PrismaClient, User } from '@prisma/client';

import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  user: null | User;
}

export default async ({ req }: any): Promise<Context> => {
  const token = req.headers.authorization || '';

  if (!token) {
    return {
      prisma,
      user: null,
    };
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as User;
    const user = await prisma.user.findUnique({
      where: { id: decoded?.id },
    });

    return {
      user,
      prisma,
    };
  } catch (error) {
    console.error('Not authorize');
    return {
      prisma,
      user: null,
    };
  }
};
