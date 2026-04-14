import User from '../models/user'
import bcrypt from 'bcrypt'

const isProvidedPasswordValid = async (email: string, password: string) => {
  const existingUser = await User.findByEmail(email)

  if (!existingUser) return null

  const isMatch = await bcrypt.compare(password, existingUser.password_hash)

  if (!isMatch) return null

  return existingUser
}

export { isProvidedPasswordValid }
