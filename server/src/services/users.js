import * as argon2 from 'argon2';

import { httpStatus } from '../constants/statusCodes';
import { insertUser, selectUserByEmail } from '../repositories/users';

export const createUser = async (input) => {
  const hashedPassword = await argon2.hash(input.password);

  const usersWithEmail = await selectUserByEmail(input.email);

  if (usersWithEmail.length) {
    throw new Error(httpStatus[406]);
  }

  const userInput = {
    ...input,
    password: hashedPassword,
    tokenVersion: 0,
  };

  const [user] = await insertUser(userInput);

  if (!user) throw new Error(httpStatus[406]);

  return user;
};
