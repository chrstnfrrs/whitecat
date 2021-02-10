import * as argon2 from 'argon2'
import { httpStatus } from '../constants/statusCodes'

import {
  deleteUser,
  selectUserById,
  selectUsers,
  updateUser,
  selectUserByEmail,
} from '../repositories/users'
import { createUser } from '../services/users'
import { createAccessToken } from '../utils/auth'

export const userResolver = async (root, args, context) => {
  const {uuid} = args;

  const [user] = await selectUserById(uuid)
  
  return user || null
}

export const usersResolver = async () => await selectUsers() || null

export const createUserResolver = async (root, args, context) => {
  const {input} = args

  const asdf = await createUser(input)

  return asdf
}

export const updateUserResolver = async (root, args, context) => {
  const {uuid, input} = args

  const [user] = await updateUser(uuid, input)
  
  if (!user) throw new Error(httpStatus[404])
  
  return user
}

export const deleteUserResolver = async (root, args, context) => {
  const {uuid} = args

  const status = await deleteUser(uuid)

  return Boolean(status)
} 

export const loginUserResolver = async (root, args, context) => {
  const { input: {email, password} } = args

  const [user] = await selectUserByEmail(email)

  if (!user) throw new Error(httpStatus[404])

  try {
    if (await argon2.verify(user.password, password)) {

      return {
        accessToken: createAccessToken(user)
      }
    }
  } catch (error) {
    console.log('loginUserResolver Error:', error)
    throw new Error(httpStatus[404])
  }

  throw new Error(httpStatus[404])
}