import { PrismaClient, User } from '@prisma/client';

/**
 * Returns a list of all the users
 * @param {PrismaClient} prisma PrismaClient instance
 * @return {Promise<User[]>} Array of users
 */
export const getUsers = async (prisma: PrismaClient): Promise<User[]> =>
  prisma.user.findMany();

/**
 * Returns the current user (given a JWT token)
 * @param {PrismaClient} prisma PrismaClient instance
 * @param {(User | undefined)} user  User instance
 * @return {Promise<User | null>} User instance (or null)
 */
export const currentUser = async (
  prisma: PrismaClient,
  user?: User
): Promise<User | null> => {
  if (!user) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
};
