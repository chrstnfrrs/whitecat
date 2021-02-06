import users from './users.js'

const runMigrations = async () => {
  await users()
}

export default runMigrations