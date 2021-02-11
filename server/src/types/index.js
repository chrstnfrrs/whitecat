import {gql} from 'apollo-server'

import Hello from './hello'
import Users from './users'
import Days from './days'

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
  Users,
  Days
]