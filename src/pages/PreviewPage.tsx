// src/pages/PreviewPage.tsx
import React from 'react';
import LoginButton from '../components/Auth/LoginButton';

const PreviewPage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Everything App</h1>
      <p className="mb-4">Manage your diary, budgets, tasks, and more in one place.</p>
      <LoginButton />
    </div>
  );
};

export default PreviewPage;
