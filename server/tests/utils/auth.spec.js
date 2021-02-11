import jsonwebtoken from 'jsonwebtoken'

import { createAccessToken } from '../../src/utils/auth'

jest.mock('jsonwebtoken')

describe('auth utils', () => {
  describe('createAccessToken', () => {
    test('should sign a jwt', () => {
      const user = {
        email: chance.string(),
        tokenVersion: chance.natural(),
        uuid: chance.string(),
      }

      createAccessToken(user)
      
      expect(jsonwebtoken.sign).toHaveBeenCalledTimes(1)
      expect(jsonwebtoken.sign).toHaveBeenCalledWith({
        email: user.email,
        tokenVersion: user.tokenVersion,
        uuid: user.uuid,
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    });
    test('should return a jwt', () => {
      const accessToken = chance.string()

      jsonwebtoken.sign.mockReturnValue(accessToken)

      const result = createAccessToken(chance.string())
      
      expect(result).toStrictEqual(accessToken)
    });
  });
});