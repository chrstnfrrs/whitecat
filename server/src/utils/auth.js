import jsonwebtoken from 'jsonwebtoken'

export const createAccessToken = (user) => {
  return jsonwebtoken.sign({uuid: user.uuid, email: user.email, tokenVersion: user.tokenVersion}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}
