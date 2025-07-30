"use server";

import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export const loginUser = async (_, formData) => {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!rawData.email || !rawData.password) {
    return { message: "Please fill all fields.", success: false };
  }

  try {
    const [users] = await pool.execute(
      'SELECT id, full_name, email, password FROM tasks WHERE email = ?',
      [rawData.email]
    );

    if (users.length === 0) {
      return { message: "Invalid email or password.", success: false };
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(rawData.password, user.password);

    if (!passwordMatch) {
      return { message: "Invalid email or password.", success: false };
    }

    // Here you would typically set up session/JWT
    // For now, just redirect to dashboard
    redirect('/dashboard');
    
  } catch (error) {
    console.error('Login error:', error);
    return { message: "Login failed. Please try again.", success: false };
  }
};