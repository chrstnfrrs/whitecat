import * as argon2 from 'argon2';

import { createUser } from '../../src/services/users'
import { selectUserByEmail, insertUser } from '../../src/repositories/users'

jest.mock('argon2')
jest.mock('../../src/repositories/users')

describe('users service', () => {
  describe('createUser', () => {
    let input, hashedPassword, user
    beforeEach(() => {
      input = {
        email: chance.string(),
        password: chance.string()
      }
      hashedPassword = chance.string()
      user = chance.string()
      selectUserByEmail.mockResolvedValue([])
      argon2.hash.mockResolvedValue(hashedPassword)
      insertUser.mockResolvedValue([user])
    });
    afterEach(jest.resetAllMocks);
    test('should hash password', async () => {
      await createUser(input)

      expect(argon2.hash).toHaveBeenCalledTimes(1)
      expect(argon2.hash).toHaveBeenCalledWith(input.password)
    });
    test('should select user with email', async () => {
      await createUser(input)

      expect(selectUserByEmail).toHaveBeenCalledTimes(1)
      expect(selectUserByEmail).toHaveBeenCalledWith(input.email)
    });
    test('should insert user', async () => {
      await createUser(input)

      expect(insertUser).toHaveBeenCalledTimes(1)
      expect(insertUser).toHaveBeenCalledWith({
        ...input,
        password: hashedPassword,
        tokenVersion: 0
      })
    });
    test('should return user', async () => {
      const result = await createUser(input)

      expect(result).toStrictEqual(user)
    });
    describe('error', () => {
      test('should throw error if there are no users with email', async () => {
        selectUserByEmail.mockResolvedValue([chance.string()])
        await expect(createUser(input)).rejects.toThrow('406 - Not Acceptable')
      });
      test('should throw error if there are no users return from insert', async () => {
        insertUser.mockResolvedValue([])
        await expect(createUser(input)).rejects.toThrow('406 - Not Acceptable')
      });
    });
  });
});