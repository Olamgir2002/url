import bcrypt from 'bcrypt'
import User from '../models/user'
import { Request, Response } from 'express'
import { isProvidedPasswordValid } from '../utils/functions'

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body

    const existingUser = await User.findByEmail(email)

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.createUser({
      email,
      fullName,
      password_hash: hashedPassword,
    })

    return res.status(201).json({ message: 'User created successfully' })
  } catch (error) {

    return res.status(500).json({ message: 'Internal server error' })
  }
}
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const userData = await isProvidedPasswordValid(email, password)

    if (!userData) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    req.session.user = userData

    return res.json({ message: 'Login successful' })

  } catch (error) {
    
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const logoutUser = (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' })
      }
      return res.json({ message: 'Logout successful' })
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
export { createUser, loginUser, logoutUser }
