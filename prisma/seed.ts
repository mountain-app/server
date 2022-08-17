import Prisma from '../src/clients/Prisma';
import logger from '../src/logger';
import { userFixture } from '../tests/fixtures/user';

const USER_COUNT = 3;

const seed = async () => {
  const usersToCreate = [...Array(USER_COUNT)].map(userFixture);

  await Prisma.getInstance().user.createMany({
    data: usersToCreate,
  });
};

seed()
  .then(async () => {
    logger.info('Seeding completed');
    await Prisma.getInstance().$disconnect();
  })
  .catch(async (e) => {
    logger.warn(`Seeding failed with error: ${e}`);
    await Prisma.getInstance().$disconnect();

    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
