import { queryField, list, nullable } from 'nexus';
import { User } from './db';
import { getUsers } from './resolvers';

export const GetUsers = queryField('getUsers', {
  type: list(nullable(User)),
  description: 'Get all users',
  resolve: (_, __, { prisma }) => getUsers(prisma),
});
