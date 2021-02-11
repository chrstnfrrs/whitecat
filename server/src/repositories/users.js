import db from '../queryBuilder';

const TABLE = 'users';
const COLUMNS = ['uuid', 'email', 'password', 'tokenVersion'];

export const deleteUser = (uuid) => db.table(TABLE).del().where({ uuid });

export const insertUser = (user) => db.table(TABLE).insert(user, COLUMNS);

export const selectUserById = (uuid) =>
  db.table(TABLE).select().where({ uuid });

export const selectUserByEmail = (email) =>
  db.table(TABLE).select().where({ email });

export const selectUsers = () => db.table(TABLE).select();

export const updateUser = (uuid, user) =>
  db.table(TABLE).where({ uuid }).update(user, COLUMNS);
