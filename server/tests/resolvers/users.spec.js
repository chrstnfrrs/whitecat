import * as argon2 from 'argon2'
import {
  userResolver,
  usersResolver,
  createUserResolver,
  updateUserResolver,
  deleteUserResolver,
  loginUserResolver
} from '../../src/resolvers/users'
import {
  selectUsers,
  selectUserById,
  updateUser,
  deleteUser,
  selectUserByEmail
} from '../../src/repositories/users'
import { createUser } from '../../src/services/users'
import { createAccessToken } from '../../src/utils/auth'

jest.mock('argon2')
jest.mock('../../src/repositories/users')
jest.mock('../../src/services/users')
jest.mock('../../src/utils/auth')

describe('users', () => {
  let _
  beforeEach(() => {
    _ = null
  });
  afterEach(jest.resetAllMocks);
  describe('userResolver', () => {
    let args
    beforeEach(() => {
      args = {
        uuid: chance.string()
      }
    });
    test('should return user if there is user', async () => {
      const user = chance.string()
      selectUserById.mockReturnValue([user])
      const result = await userResolver(_, args)

      expect(result).toStrictEqual(user)
    });
    test('should return null if there is no matching user', async () => {
      selectUserById.mockReturnValue([])
      const result = await userResolver(_, args)

      expect(result).toBeNull()
    });
  });
  describe('usersResolver', () => {
    test('should return users if there are users', async () => {
      const users = chance.string()
      selectUsers.mockReturnValue(users)
      const result = await usersResolver()

      expect(result).toStrictEqual(users)
    });
    test('should return null if there are no users', async () => {
      selectUsers.mockReturnValue(null)
      const result = await usersResolver()

      expect(result).toBeNull()
    });
  });
  describe('createUserResolver', () => {
    let args
    beforeEach(() => {
      args = {
        input: chance.string()
      }
    });
    test('should create a user', async() => {
      await createUserResolver(_, args)

      expect(createUser).toHaveBeenCalledTimes(1)
      expect(createUser).toHaveBeenCalledWith(args.input)
    });
    test('should return created user', async() => {
      const user = chance.string()
      createUser.mockResolvedValue(user)
      const result = await createUserResolver(_, args)

      expect(result).toStrictEqual(user)
    });
  });
  describe('updateUserResolver', () => {
    let args, user
    beforeEach(() => {
      args = {
        uuid: chance.string(),
        input: chance.string()
      }
      user = chance.string()
      updateUser.mockReturnValue([user])
    });
    test('should update user', async () => {
      await updateUserResolver(_, args)
      
      expect(updateUser).toHaveBeenCalledTimes(1)
      expect(updateUser).toHaveBeenCalledWith(args.uuid, args.input)
    });
    test('should return updated user', async () => {
      const result = await updateUserResolver(_, args)
      expect(result).toStrictEqual(user)
    });
    describe('error', () => {
      test('should throw an error if user cannot be updated', async () => {
        updateUser.mockReturnValue([])
        await expect(updateUserResolver(_, args)).rejects.toThrow('404 - Not Found')
      });
    });
  });
  describe('deleteUserResolver', () => {
    let args
    beforeEach(() => {
      args = {
        uuid: chance.string()
      }
    });
    test('should delete user', async () => {
      await deleteUserResolver(_, args)

      expect(deleteUser).toHaveBeenCalledTimes(1)
      expect(deleteUser).toHaveBeenCalledWith(args.uuid)
    });
    test('should return whether user was deleted', async () => {
      const userWasDeleted = chance.bool()
      deleteUser.mockReturnValue(userWasDeleted)
      const result = await deleteUserResolver(_, args)

      expect(result).toStrictEqual(userWasDeleted)
    });
  });
  describe('loginUserResolver', () => {
    let args
    beforeEach(() => {
      args = {
        input: {
          email: chance.string(),
          password: chance.string()
        }
      }
      selectUserByEmail.mockResolvedValue([chance.string()])
      argon2.verify.mockResolvedValue(true)
      createAccessToken.mockResolvedValue(chance.string())
    });
    test('should find user by email', async () => {
      await loginUserResolver(_, args)

      expect(selectUserByEmail).toHaveBeenCalledTimes(1)
      expect(selectUserByEmail).toHaveBeenCalledWith(args.input.email)
    });
    test('should verify password', async () => {
      const user = {
        password: chance.string()
      }
      selectUserByEmail.mockResolvedValue([user])
      await loginUserResolver(_, args)

      expect(argon2.verify).toHaveBeenCalledTimes(1)
      expect(argon2.verify).toHaveBeenCalledWith(user.password, args.input.password)
    });
    describe('valid password', () => {

      test('should create an access token', async () => {
        const user = chance.string()
        selectUserByEmail.mockResolvedValue([user])
        await loginUserResolver(_, args)
  
        expect(createAccessToken).toHaveBeenCalledTimes(1)
        expect(createAccessToken).toHaveBeenCalledWith(user)
      });

      test('should return an access token', async () => {
        const token = chance.string()
        createAccessToken.mockReturnValue(token)
        const result = await loginUserResolver(_, args)
  
        expect(result).toStrictEqual({
          accessToken: token
        })
      });
    });
    describe('error', () => {
      test('should throw error if not user is found with email', async () => {
        selectUserByEmail.mockResolvedValue([])

        await expect(loginUserResolver(_, args)).rejects.toThrow('404 - Not Found')
      });

      test('should log verification failures', async () => {
        global.console = {log: jest.fn()}
        const error = new Error(chance.string())
        argon2.verify.mockRejectedValue(error)

        await expect(loginUserResolver(_, args)).rejects.toThrow()

        expect(console.log).toHaveBeenCalledTimes(1)
        expect(console.log).toHaveBeenCalledWith('loginUserResolver Error:', error)
      });
      test('should throw not found error if verification throws', async () => {
        argon2.verify.mockRejectedValue(chance.string())

        await expect(loginUserResolver(_, args)).rejects.toThrow('404 - Not Found')
      });
      test('should throw not found error of end of code is reached', async () => {
        argon2.verify.mockResolvedValue(false)

        await expect(loginUserResolver(_, args)).rejects.toThrow('404 - Not Found')
      });
    });
  });
});