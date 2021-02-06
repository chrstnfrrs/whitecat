import jsonwebtoken from 'jsonwebtoken'

export const createAccessToken = (user) => {
  return jsonwebtoken.sign({uuid: user.uuid, email: user.email, tokenVersion: user.tokenVersion}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export const createRefreshToken = (user) => {
  return jsonwebtoken.sign({uuid: user.uuid, email: user.email, tokenVersion: user.tokenVersion}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

export const sendRefreshToken = (res, user) => {
  return res.cookie(
    'asdf',
    createRefreshToken(user),
    {
      httpOnly: true
    }
  )
}

export const revokeRefreshTokensForUser = (uuid) => {
  try {
    // get user
    // increment users tokenVersion
  } catch {
    return false
  }
  return true
}