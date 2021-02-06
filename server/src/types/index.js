import {gql} from 'apollo-server'

import Hello from './hello.js'
import Users from './users.js'

const Query = gql`
  type Query
`
const Mutation = gql`
  type Mutation
`

export default [
  Query,
  Mutation,
  Hello,
  Users
]