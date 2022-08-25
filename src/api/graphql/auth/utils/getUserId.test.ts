import { Request } from 'express';
import { auth } from 'firebase-admin';
import { jwtPayloadFixture } from '../../../../../tests/fixtures/jwtPayload';
import { getUserId } from './getUserId';

jest.mock('firebase-admin', () => ({
  auth: jest.fn(),
  apps: ['app'],
}));

const jwtPayload = jwtPayloadFixture();

const authResult = {
  verifyIdToken: jest.fn(),
};

describe('getUserId', () => {
  beforeEach(() => {
    (auth as jest.Mock).mockReturnValue(authResult);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return null if 'authorization' header is missing", async () => {
    const req = {
      headers: {},
    } as Request;

    const userId = await getUserId(req);

    expect(auth).not.toHaveBeenCalled();
    expect(authResult.verifyIdToken).not.toHaveBeenCalled();
    expect(userId).toBeNull();
  });

  it('should return null if JWT payload is invalid', async () => {
    (authResult.verifyIdToken as jest.Mock).mockRejectedValue(
      new Error('Invalid JWT payload')
    );

    const req = {
      headers: {
        authorization: 'Bearer invalid',
      },
    } as Request;

    const userId = await getUserId(req);

    expect(auth).toHaveBeenCalled();
    expect(authResult.verifyIdToken).toHaveBeenCalledWith('invalid');
    expect(userId).toBeNull();
  });

  it("should return the user id if it's present in the JWT payload", async () => {
    (authResult.verifyIdToken as jest.Mock).mockResolvedValue(jwtPayload);

    const req = {
      headers: {
        authorization: 'Bearer token',
      },
    } as Request;

    const userId = await getUserId(req);

    expect(auth).toHaveBeenCalled();
    expect(authResult.verifyIdToken).toHaveBeenCalledWith('token');
    expect(userId).toEqual(jwtPayload.uid);
  });
});
