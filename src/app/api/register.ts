// src/pages/api/register.ts - Registration API endpoint
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import pool from '../../lib/db';
import type { RegisterRequest, RegisterResponse } from '../../types/user';
import mysql from 'mysql2/promise'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
        error: 'Method not allowed',
        message: ''
    });
  }

  const { username, email, password }: RegisterRequest = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({
        error: 'All fields are required',
        message: ''
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
        error: 'Password must be at least 6 characters',
        message: ''
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
        error: 'Invalid email format',
        message: ''
    });
  }

  try {
    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return res.status(409).json({
          error: 'User already exists',
          message: ''
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    const insertResult = result as mysql.ResultSetHeader;

    res.status(201).json({
      message: 'User registered successfully',
      userId: insertResult.insertId
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: ''
    });
  }
}
