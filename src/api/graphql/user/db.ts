import { enumType, objectType } from 'nexus';

const Gender = enumType({
  name: 'Gender',
  description: "The user's gender",
  members: ['MALE', 'FEMALE', 'UNKNOWN'],
});

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
    t.string('firstName', {
      description: 'The first name of the user',
    });
    t.string('lastName', {
      description: 'The last name of the user',
    });
    t.dateTime('birthday', {
      description: 'The birthday of the user',
    });
    t.field('gender', {
      description: 'The gender of the user',
      type: Gender,
    });
    t.dateTime('createdAt', {
      description: 'The timestamp the user was created',
    });
    t.dateTime('updatedAt', {
      description: 'The timestamp the user was last updated',
    });
  },
});
