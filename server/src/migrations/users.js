import db from '../queryBuilder';

const createUsersTable = () =>
  db.schema.createTable('users', (table) => {
    table
      .uuid('uuid')
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary()
      .unique();
    table.string('email');
    table.string('password');
    table.integer('tokenVersion');
  });

const users = async () => {
  const hasUsers = await db.schema.hasTable('users');

  if (!hasUsers) {
    await createUsersTable();
  }
};

export default users;
