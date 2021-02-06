import {ApolloProvider} from '@apollo/client'

import "../styles/globals.css";
import AppMenu from '../components/AppMenu'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = process.env.ACCESS_TOKEN
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

const App = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <AppMenu />
    <Component {...pageProps} />
  </ApolloProvider>
)

export default App
