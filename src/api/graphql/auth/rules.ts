import { User } from '@prisma/client';
import { AuthenticationError } from 'apollo-server-express';
import { rule } from 'graphql-shield';
import { Context } from '../context';

/**
 * Checks if the user is authenticated
 * @param user The user to check
 * @returns {boolean} true if the user is authenticated
 * @throws AuthenticationError if the user is not authenticated
 */
export const isAuthenticated = (user?: User): boolean => {
  if (!user) {
    throw new AuthenticationError('Not authenticated');
  }

  return true;
};

export const isAuthenticatedRule = rule({
  cache: 'contextual',
})(async (_, __, { user }: Context) => isAuthenticated(user));
