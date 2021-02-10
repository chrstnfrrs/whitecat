import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import typeDefs from './types/index'
import resolvers from './resolvers/index'
import migrations from './migrations/index'

await migrations()

const app = express()

app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.options('*', cors());

app.get('/', (req, res) => res.send('hello'))

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
