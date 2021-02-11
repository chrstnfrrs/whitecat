import db from '../queryBuilder'
import { format } from 'date-fns'

export const daysResolver = async (root, args, context) => {
  const { userUuid } = args

  const mappedUser = { user_uuid: userUuid }

  const days = await selectDaysByUser(mappedUser)

  const mappedDays = days.map(({date, user_uuid}) => ({
    date: format(date, 'yyyy-MM-dd'),
    userUuid: user_uuid
  }))

  return mappedDays
} 

export const allDaysResolver = async (root, args, context) => {
  const days = await selectDays() || null

  const mappedDays = days.map(({date, user_uuid}) => ({
    date,
    userUuid: user_uuid
  }))

  return mappedDays
} 

export const createDayResolver = async (root, args, context) => {
  const { userUuid } = args
  const date = new Date()

  const inserting = {
    user_uuid: userUuid,
    date: new Date()
  }

  const inserted = await insertUser(inserting)

  return {
    userUuid: 'asdf',
    date: 'asdf'
  }

} 
