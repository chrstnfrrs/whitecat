import { helloResolver } from './hello'
import {
  userResolver,
  usersResolver,
  createUserResolver,
  updateUserResolver,
  deleteUserResolver,
  loginUserResolver
} from './users'

import {
  daysResolver,
  allDaysResolver,
  createDayResolver
} from './days'

const resolvers = {
  Query: {
    allDays: allDaysResolver,
    days: daysResolver,
    user: userResolver,
    users: usersResolver,
    hello: helloResolver,
  },
  Mutation: {
    createDay: createDayResolver,
    createUser: createUserResolver,
    deleteUser: deleteUserResolver,
    loginUser: loginUserResolver,
    updateUser: updateUserResolver,
  }
}

export default resolvers