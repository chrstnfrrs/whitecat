import db from '../queryBuilder'

const TABLE = 'days'
const COLUMNS = ['date', 'userUuid']

export const insertDay = async (date) =>
  db.table(TABLE).insert(date, COLUMNS)

export const selectDaysByUser = async () =>
  db.table(TABLE).select().where(user)

export const selectDays = async () =>
  db.table(TABLE).select()