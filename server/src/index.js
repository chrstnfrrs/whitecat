import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import 'dotenv/config.js'
import cookieParser from 'cookie-parser'
import jsonwebtoken from 'jsonwebtoken'
import cors from 'cors'

import typeDefs from './types/index.js'
import resolvers from './resolvers/index.js'
import migrations from './migrations/index.js'

import {selectUserById} from './repositories/users.js'
import { createAccessToken, sendRefreshToken } from './utils/auth.js'

await migrations()

const app = express()

app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.options('*', cors());

app.get('/', (req, res) => res.send('hello'))

app.post('/refresh_token', async (req, res) => {
  const token = req.cookies.wcuid
  if (!token) return res.send({ ok: false, accessToken: '' })

  let payload;

  try {
    payload = jsonwebtoken.verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (err) {
    console.log('err', err)
    return res.send({ ok: false, accessToken: '' })
  }

  // token is valid
  const [user] = await selectUserById(payload.uuid)

  if (!user) return res.send({ ok: false, accessToken: '' })

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' })
  }

  sendRefreshToken(res, user)

  return res.send({ ok: true, accessToken: createAccessToken(user) })

})

const apolloServer = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      req,
      res
    }
  }
 });

apolloServer.applyMiddleware({ app, cors: false })

app.listen(4000, () => {
  console.log('\n🚀  Server ready at http://localhost:4000/graphql\n');
});


// NEXT AUTH

// const sessionToken = req.cookies['next-auth.session-token']
// const authToken = req.headers.authorization?.split(' ')?.[1]

// let sessionPayload, authPayload;
// try {
//   sessionPayload = jsonwebtoken.verify(sessionToken, '')
//   console.log('---valid session token---')
// } catch (err) {
//   console.log('sessionPayload err', err)
// }
// try {
//   authPayload = jsonwebtoken.verify(authToken, process.env.ACCESS_TOKEN_SECRET)
//   console.log('---valid auth token---')
// } catch (err) {
//   console.log('authPayload err', err)
// }

// console.log('sessionToken', sessionToken)
// console.log('cookies', req.cookies)