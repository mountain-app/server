import { JwtPayload } from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

/**
 * Generate a random JWT payload with random values
 * @returns {JwtPayload} A mock JWT payload
 */
export const jwtPayloadFixture = (): JwtPayload => ({
  exp: Math.floor(faker.date.future().getTime() / 1000),
  iat: Math.floor(faker.date.past().getTime() / 1000),
  jti: faker.datatype.uuid(),
  sub: faker.datatype.uuid(),
  iss: faker.internet.url(),
  aud: faker.internet.url(),
});
