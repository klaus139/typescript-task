// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

// Sign up
export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    if(!email || !password || !name || !role){
        return res.status(400).json({
            message:"please fill all fields"
        })
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const newUser = await User.create({
      email,
      password,
      name,
      role: role || 'user',
    });

    const token = generateToken(newUser.id, newUser.role);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"please fill all the required fields"
        })
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
