import { Gender, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const userFixture = (): User => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  birthday: faker.date.past(),
  gender: faker.helpers.arrayElement(Object.values(Gender)),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});
