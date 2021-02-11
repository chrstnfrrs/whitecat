/*
 * import jsonwebtoken from 'jsonwebtoken'  
 * const authorization = context.req.headers.authorization
 */

/*
 * console.log('invalid token')
 * if(!authorization) throw new Error('Not Authenticated')
 */

/*
 * try {
 *   const authorizationToken = authorization.split(' ')[1]
 *   const payload = jsonwebtoken.verify(authorizationToken, process.env.ACCESS_TOKEN_SECRET)
 *   uuid = payload.uuid
 * } catch {
 *   console.log('invalid token')
 *   throw new Error('invalid token')
 * }
 */