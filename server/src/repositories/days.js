import db from '../queryBuilder';

const TABLE = 'days';
const COLUMNS = ['date', 'userUuid'];

export const insertDay = (date) => db.table(TABLE).insert(date, COLUMNS);

export const selectDaysByUser = (user) => db.table(TABLE).select().where(user);

export const selectDays = () => db.table(TABLE).select();
