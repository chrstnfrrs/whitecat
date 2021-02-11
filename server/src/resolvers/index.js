import { helloResolver } from './hello';
import {
  userResolver,
  usersResolver,
  createUserResolver,
  updateUserResolver,
  deleteUserResolver,
  loginUserResolver,
} from './users';
import { daysResolver, allDaysResolver, createDayResolver } from './days';

const resolvers = {
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
};

export default resolvers;
