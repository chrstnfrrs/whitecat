import { format } from 'date-fns';

import { selectDaysByUser, selectDays, insertDay } from '../repositories/days';

export const daysResolver = async (root, args) => {
  const { userUuid } = args;

  const mappedUser = { user_uuid: userUuid };

  const days = await selectDaysByUser(mappedUser);

  const mappedDays = days.map(({ date, user_uuid }) => ({
    date: format(date, 'yyyy-MM-dd'),
    userUuid: user_uuid,
  }));

  return mappedDays;
};

export const allDaysResolver = async () => {
  const days = (await selectDays()) || null;

  const mappedDays = days.map(({ date, user_uuid }) => ({
    date,
    userUuid: user_uuid,
  }));

  return mappedDays;
};

export const createDayResolver = async (root, args) => {
  const { userUuid } = args;

  const inserting = {
    date: new Date(),
    user_uuid: userUuid,
  };

  const [day] = await insertDay(inserting);

  if (!day) throw new Error('Day does not exist');

  return {
    date: format(new Date(), 'yyyy-MM-dd'),
    userUuid,
  };
};
