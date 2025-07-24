'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setUser(data.user);
        // Store token in localStorage for future requests
        localStorage.setItem('token', data.token);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setMessage('');
  };

  if (user) {
    return (
      <div className="max-w-md p-6 mx-auto mt-8 border rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-8 border rounded-lg">
      <div className="flex mb-4">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
            required
          />
        )}
        
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        
        <button 
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      {message && (
        <p className={`mt-4 ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}


