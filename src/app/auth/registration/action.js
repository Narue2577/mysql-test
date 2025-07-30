"use server";

import pool from '@/lib/db'; // Adjust path as needed
import bcrypt from 'bcryptjs'; // You need to install this: npm install bcryptjs


export const saveFormDatasToDatabase = async (_, formData) => {
  const rawData = {
    email: formData.get("email"),
    fullName: formData.get("fullName"),
    password: formData.get("password"),
  };

  // Validation (your existing code)
  if (!rawData.email || !rawData.password || !rawData.fullName) {
    return { message: "Please fill all the areas.", inputs: rawData };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rawData.email)) {
    return {
      message: "Please enter a valid email address.",
      inputs: rawData,
    };
  }

  if (rawData.fullName.length < 2 || rawData.fullName.length > 50) {
    return {
      message: "Name must be between 2 and 50 characters.",
      inputs: rawData,
    };
  }

  // MISSING: Password validation
  if (rawData.password.length < 6) {
    return {
      message: "Password must be at least 6 characters long.",
      inputs: rawData,
    };
  }

  try {
    // MISSING: Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT email FROM tasks WHERE email = ?',
      [rawData.email]
    );

    if (existingUsers.length > 0) {
      return {
        message: "User with this email already exists.",
        success: false,
      };
    }

    // MISSING: Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(rawData.password, saltRounds);

    // MISSING: Insert user into database
    await pool.execute(
      'INSERT INTO tasks (full_name, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [rawData.fullName, rawData.email, hashedPassword]
    );

    // Return success message instead of redirect
    return {
      message: "Registration successful! You can now login.",
      success: true,
    };
    
  } catch (error) {
    console.error('Database error:', error);
    return {
      message: "Registration failed. Please try again.",
      success: false,
    };
  }
};