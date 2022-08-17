import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtPayloadFixture } from '../../../../../tests/fixtures/jwtPayload';
import serverConfig from '../../../../configs/server';
import { getUserId } from './getUserId';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

const jwtPayload = jwtPayloadFixture();

describe('getUserId', () => {
  beforeEach(() => {
    (verify as jest.Mock).mockReturnValue(jwtPayload);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return null if 'authorization' header is missing", () => {
    const req = {
      headers: {},
    } as Request;

    const userId = getUserId(req);

    expect(verify).not.toHaveBeenCalled();
    expect(userId).toBeNull();
  });

  it('should return null if JWT payload is invalid', () => {
    (verify as jest.Mock).mockReturnValue({
      ...jwtPayload,
      sub: undefined,
    });

    const req = {
      headers: {
        authorization: 'Bearer invalid',
      },
    } as Request;

    const userId = getUserId(req);

    expect(verify).toHaveBeenCalledWith('invalid', serverConfig.JWT_SECRET);
    expect(userId).toBeNull();
  });

  it("should return the user id if it's present in the JWT payload", () => {
    const req = {
      headers: {
        authorization: 'Bearer token',
      },
    } as Request;

    const userId = getUserId(req);

    expect(verify).toHaveBeenCalledWith('token', serverConfig.JWT_SECRET);
    expect(userId).toEqual(jwtPayload.sub);
  });
});
