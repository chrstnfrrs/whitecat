import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import typeDefs from './types';
import resolvers from './resolvers';
import migrations from './migrations';

migrations();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);
app.options('*', cors());

app.get('/', (req, res) => res.send('hello'));

const apolloServer = new ApolloServer({
  context: ({ req, res }) => {
    return {
      req,
      res,
    };
  },
  resolvers,
  typeDefs,
});

apolloServer.applyMiddleware({
  app,
  cors: false,
});

app.listen(4000, () => {
  console.log('\n🚀  Server ready at http://localhost:4000/graphql\n');
});
