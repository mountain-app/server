import { queryField, list, nullable } from 'nexus';
import { User } from './db';
import { currentUser, getUsers } from './resolvers';

export const GetUsers = queryField('getUsers', {
  type: list(nullable(User)),
  description: 'Get all users',
  resolve: (_, __, { prisma }) => getUsers(prisma),
});

export const CurrentUser = queryField('currentUser', {
  type: nullable(User),
  description: 'Get the current user',
  resolve: (_, __, { prisma, user }) => currentUser(prisma, user),
});
