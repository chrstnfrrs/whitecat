import {gql} from 'apollo-server'

const dayTypes = gql`
  extend type Query {
    days(userUuid: ID!): [Day!]
    allDays: [Day!]
  }

  extend type Mutation {
    createDay(userUuid: ID!): Day!
  }

  type Day {
    userUuid: ID!
    date: String!
  }
`

export default dayTypes
