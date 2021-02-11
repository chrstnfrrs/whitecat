import users from './users'
import days from './days'

const runMigrations = async () => {
  await users()
  await days()
}

export default runMigrations