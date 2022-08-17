import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const userFixture = (): User => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});
