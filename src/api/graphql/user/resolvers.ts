import { PrismaClient, User } from '@prisma/client';

/**
 * Returns a list of all the users
 * @param prisma PrismaClient instance
 * @returns {Promise<User[]>} Array of users
 */
export const getUsers = async (prisma: PrismaClient): Promise<User[]> =>
  prisma.user.findMany();
