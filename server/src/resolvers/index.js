import { helloResolver } from './hello'
import {
  userResolver,
  usersResolver,
  createUserResolver,
  updateUserResolver,
  deleteUserResolver,
  loginUserResolver
} from './users'

const resolvers = {
  Query: {
    user: userResolver,
    users: usersResolver,
    hello: helloResolver
  },
  Mutation: {
    createUser: createUserResolver,
    updateUser: updateUserResolver,
    deleteUser: deleteUserResolver,
    loginUser: loginUserResolver,
  }
}

export default resolvers