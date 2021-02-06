import db from '../queryBuilder.js'

const TABLE = 'users'
const COLUMNS = ['uuid', 'id', 'email', 'password', 'tokenVersion']

export const deleteUser = async (uuid) =>
  db.table(TABLE).del().where({uuid})

export const insertUser = async (user) =>
  db.table(TABLE).insert(user).returning(COLUMNS)

export const selectUserById = async (uuid) =>
  db.table(TABLE).select().where({uuid})

export const selectUserByEmail = async (email) =>
  db.table(TABLE).select().where({email})

export const selectUsers = async () =>
  db.table(TABLE).select()

export const updateUser = async (uuid, user) =>
  db.table(TABLE).where({uuid}).update(user).returning(COLUMNS)