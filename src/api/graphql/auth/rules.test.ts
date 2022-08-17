import { AuthenticationError } from 'apollo-server-express';
import { userFixture } from '../../../../tests/fixtures/user';
import { isAuthenticated } from './rules';

describe('Rules', () => {
  describe('isAuthenticated', () => {
    it('should return false if the user is not provided', async () => {
      expect(() => isAuthenticated(undefined)).toThrow(AuthenticationError);
    });

    it('should return true if the user is provided', async () => {
      const fn = isAuthenticated(userFixture());

      expect(fn).toBeTruthy();
      expect(() => fn).not.toThrowError();
    });
  });
});
