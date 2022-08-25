import { User } from '@prisma/client';
import { Request } from 'express';
import { auth } from 'firebase-admin';
import logger from '../../../../logger';

/**
 * Returns the user id from the JWT token payload, or null if there is no token
 * @param {Request} req Request object
 * @returns {Promise<User['id'] | null>} The user id from the JWT token payload, or null if there is no token
 */
export const getUserId = async (req: Request): Promise<User['id'] | null> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return null;
  }

  try {
    // Authorization: Bearer <token>
    const token = authorization.split(' ')[1];
    const jwtPayload = await auth().verifyIdToken(token);

    return jwtPayload.uid;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
