// src/pages/Dashboard.tsx
import React from 'react';
import LogoutButton from '../components/Auth/LogoutButton';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {/* Add dashboard components or links to different features */}
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
