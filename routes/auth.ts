import bcrypt from 'bcrypt';
import user from '../models/user';
const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';

router.post('/', async (req: Request, res: Response) => {
    const { email, password, fullName } = req.body;
    const existingUser = await user.findByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, fullName, password_hash: hashedPassword };
    user.createUser(newUser);
    res.status(201).json({ message: 'User created successfully' });
});
export default router;