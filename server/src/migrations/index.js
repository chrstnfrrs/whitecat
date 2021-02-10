import users from './users'

const runMigrations = async () => {
  await users()
}

export default runMigrations