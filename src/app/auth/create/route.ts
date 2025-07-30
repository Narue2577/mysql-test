// import the Request and Response classes

import { NextResponse, NextRequest } from 'next/server'
import { createConnection } from '@/lib/db'
import mysql from  'mysql2/promise';

// define and export the GET handler function


export async function POST(request: Request, response:Response) {
  try {
    // 2. connect to database

    const connection = await createConnection(); 
    const { fullName, email, password } = await request.json();
    const [result] = await connection.query('INSERT INTO tasks (fullName, email, password) VALUES (?, ?)', [title, description]);
    response.status(201).json({ id: result.fullName, email, password });
    connection.end();
}

}  