import { faker } from '@faker-js/faker';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

/**
 * Generate a random JWT payload with random values
 * @returns {DecodedIdToken} A mock JWT payload
 */
export const jwtPayloadFixture = (): DecodedIdToken => ({
  exp: Math.floor(faker.date.future().getTime() / 1000),
  iat: Math.floor(faker.date.past().getTime() / 1000),
  jti: faker.datatype.uuid(),
  sub: faker.datatype.uuid(),
  iss: faker.internet.url(),
  aud: faker.internet.url(),
  auth_time: Math.floor(faker.date.recent().getTime() / 1000),
  user_id: faker.datatype.uuid(),
  firebase: {
    identities: {
      [faker.internet.url()]: [],
    },
    sign_in_provider: faker.internet.url(),
  },
  uid: faker.datatype.uuid(),
});
