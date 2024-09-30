// src/pages/LoginPage.tsx
import React from 'react';
import LoginButton from '../components/Auth/LoginButton';

const LoginPage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <LoginButton />
    </div>
  );
};

export default LoginPage;
