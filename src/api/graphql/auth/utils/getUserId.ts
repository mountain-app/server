import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import serverConfig from '../../../../configs/server';

/**
 * Returns the user id from the JWT token payload, or null if there is no token
 * @param {Request} req Request object
 * @returns {User['id'] | null} The user id from the JWT token payload, or null if there is no token
 */
export const getUserId = (req: Request): User['id'] | null => {
  const { authorization } = req.headers;

  if (authorization) {
    // Authorization: Bearer <token>
    const token = authorization.split(' ')[1];
    const jwtPayload = verify(token, serverConfig.JWT_SECRET) as JwtPayload;

    return jwtPayload.sub || null;
  }

  return null;
};
