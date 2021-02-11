import {gql} from 'apollo-server'

const userTypes = gql`
  extend type Query {
    user(uuid: ID!): User
    users: [User!]
  }

  extend type Mutation {
    createUser(input: UserInput!): User!
    updateUser(uuid: ID!, input: UserUpdate!): User!
    deleteUser(uuid: ID!): Boolean!
    loginUser(input: UserInput!): LoginCredentials!
  }

  type LoginCredentials {
    accessToken: String!
  }

  type User {
    uuid: ID!
    email: String!
    password: String!
    tokenVersion: Int!
  }

  input UserInput {
    email: String!
    password: String!
  }

  input UserUpdate {
    email: String
    password: String
  }
`

export default userTypes
