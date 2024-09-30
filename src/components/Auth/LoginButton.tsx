// src/components/Auth/LoginButton.tsx
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { setUser } from '../../features/authSlice';

const LoginButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser(result.user));
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Sign in with Google
    </button>
  );
};

export default LoginButton;
