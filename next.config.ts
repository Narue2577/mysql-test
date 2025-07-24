import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Production environment
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'database4',
    
    // Development environment
    host_dev: 'localhost',
    port_dev: '3306',
    user_dev: 'root',
    password_dev: '',
    database_dev: 'database3',
  },
};

export default nextConfig;
