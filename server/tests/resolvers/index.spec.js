import resolvers from '../../src/resolvers'
import {
  userResolver,
  usersResolver,
  createUserResolver,
  updateUserResolver,
  deleteUserResolver,
  loginUserResolver
} from '../../src/resolvers/users'
import { helloResolver } from '../../src/resolvers/hello'

describe('resolvers', () => {
  test('should be have correct resolver map', () => {
    expect(JSON.stringify(resolvers)).toEqual(JSON.stringify({
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
    }))
  });
});