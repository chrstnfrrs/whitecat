import jsonwebtoken from 'jsonwebtoken'

import { createAccessToken } from '../../src/utils/auth'

jest.mock('jsonwebtoken')

describe('auth utils', () => {
  describe('createAccessToken', () => {
    test('should sign a jwt', () => {
      const user = {
        uuid: chance.string(),
        email: chance.string(),
        tokenVersion: chance.natural()
      }

      createAccessToken(user)
      
      expect(jsonwebtoken.sign).toHaveBeenCalledTimes(1)
      expect(jsonwebtoken.sign).toHaveBeenCalledWith({uuid: user.uuid, email: user.email, tokenVersion: user.tokenVersion}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    });
    test('should sign a jwt', () => {
      const accessToken = chance.string()
      jsonwebtoken.sign.mockReturnValue(accessToken)

      const result = createAccessToken(chance.string())
      
      expect(result).toStrictEqual(accessToken)
    });
  });
});