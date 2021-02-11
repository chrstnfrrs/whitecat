import resolvers from '../../src/resolvers';
import {
  userResolver,
  usersResolver,
  createUserResolver,
  updateUserResolver,
  deleteUserResolver,
  loginUserResolver,
} from '../../src/resolvers/users';
import { helloResolver } from '../../src/resolvers/hello';
import {
  daysResolver,
  allDaysResolver,
  createDayResolver,
} from '../../src/resolvers/days';

describe('resolvers', () => {
  test('should be have correct resolver map', () => {
    expect(JSON.stringify(resolvers)).toStrictEqual(
      JSON.stringify({
        Mutation: {
          createDay: createDayResolver,
          createUser: createUserResolver,
          deleteUser: deleteUserResolver,
          loginUser: loginUserResolver,
          updateUser: updateUserResolver,
        },
        Query: {
          allDays: allDaysResolver,
          days: daysResolver,
          hello: helloResolver,
          user: userResolver,
          users: usersResolver,
        },
      }),
    );
  });
});
