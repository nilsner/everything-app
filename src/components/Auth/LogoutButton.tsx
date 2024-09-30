// src/components/Auth/LogoutButton.tsx
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { setUser } from '../../features/authSlice';

const LogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
