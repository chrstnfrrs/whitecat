import db from '../queryBuilder';

const days = () =>
  db.raw(
    `CREATE TABLE IF NOT EXISTS days (
    date date NOT NULL,
    user_uuid uuid,
      PRIMARY KEY(date, user_uuid),
      FOREIGN KEY(user_uuid) REFERENCES users(uuid)
  );`,
  );

export default days;
