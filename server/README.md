# Apollo Server Example

This is the server that runs **whitecat**. It's an Apollo server that connects to a PostgreSQL database using Knex.

## Installation

1. `yarn` - install dependencies
2. `yarn dev` - run server

## Using GraphQL Playground

After running `yarn dev` the graphql server will have a graphql playground available at: `http://localhost:4000/graphql`.

Here you'll have access to multiple graphql queries and mutations.

### Hello Query

The most straight forward query on this server is hello. It's a query that resolves to a static string.

```
query Hello {
  hello
}
```
