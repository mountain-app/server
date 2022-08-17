import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  description: 'A user of the application',
  definition(t) {
    t.id('id', {
      description: 'The id of the user',
    });
    t.email('email', {
      description: 'The email of the user',
    });
    t.nullable.string('name', {
      description: 'The name of the user',
    });
    t.dateTime('createdAt', {
      description: 'The timestamp the user was created',
    });
    t.dateTime('updatedAt', {
      description: 'The timestamp the user was last updated',
    });
  },
});
