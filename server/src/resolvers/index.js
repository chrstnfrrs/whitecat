import {
  userResolver,
  usersResolver,
  createUserResolver,
  updateUserResolver,
  deleteUserResolver,
  loginUserResolver
} from './users.js'

const resolvers = {
  Query: {
    user: userResolver,
    users: usersResolver,
    hello: () => 'Hello World'
  },
  Mutation: {
    createUser: createUserResolver,
    updateUser: updateUserResolver,
    deleteUser: deleteUserResolver,
    loginUser: loginUserResolver,
  }
}

export default resolvers