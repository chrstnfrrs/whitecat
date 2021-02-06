import * as argon2 from 'argon2'
import jsonwebtoken from 'jsonwebtoken'

import {
  deleteUser,
  insertUser,
  selectUserById,
  selectUsers,
  updateUser,
  selectUserByEmail,
} from '../repositories/users.js'
import { createAccessToken, sendRefreshToken } from '../utils/auth.js'


export const userResolver = async (root, args, context) => {
  let uuid;
  
  const authorization = context.req.headers.authorization

  console.log('invalid token')
  if(!authorization) throw new Error('Not Authenticated')

  try {
    const authorizationToken = authorization.split(' ')[1]
    const payload = jsonwebtoken.verify(authorizationToken, process.env.ACCESS_TOKEN_SECRET)
    uuid = payload.uuid
  } catch {
    console.log('invalid token')
    throw new Error('invalid token')
  }

  const [user] = await selectUserById(uuid)
  
  return user || null
}

export const usersResolver = async () => await selectUsers() || null

export const createUserResolver = async (root, args, context) => {
  const {input} = args

  const hashedPassword = await argon2.hash(input.password)

  const userInput = {
    ...input,
    password: hashedPassword,
    tokenVersion: 0,
  }

  const [user] = await insertUser(userInput)

  if(!user) throw new Error('Failed to insert user')

  return user
}

export const updateUserResolver = async (root, args, context) => {
  const {uuid, input} = args

  const [user] = await updateUser(uuid, input)
  
  if (!user) throw new Error('Failed to update user')
  
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
  
  if (!user) throw new Error('No user with login credentials found.')

  try {
    console.log(await argon2.verify(user.password, password))
    if (await argon2.verify(user.password, password)) {
      sendRefreshToken(context.res, user)
      return {
        accessToken: createAccessToken(user)
      }
    }
  } catch (err) {
    throw new Error(err)
  }

  throw new Error('No user with login credentials found.')
}