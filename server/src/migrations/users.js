import db from '../queryBuilder.js'

const createUsersTable = async () => db.schema.createTable('users', (table) => {
  table.uuid('uuid').defaultTo(db.raw('uuid_generate_v4()')).primary()
  table.increments('id')
  table.string('email')
  table.string('password')
  table.integer('tokenVersion')
})

const users = async () => {
  const hasUsers = await db.schema.hasTable('users')
  console.log(hasUsers)
  if (!hasUsers) {
    await createUsersTable()
  }
}

export default users