// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const Header: React.FC = () => {
    const { user, isAdmin } = useAppSelector((state) => state.auth);
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">EVERYTHING</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/diary" className="hover:underline">
                Diary
              </Link>
            </li>
            <Link to="/habits" className="hover:underline">
                  Habits
                </Link>
            <li>
              <Link to="/budget" className="hover:underline">
                Budget
              </Link>
            </li>
            {isAdmin && (
            <li>
                <Link to="/admin" className="hover:underline">
                    Admin Panel
                </Link>
            </li>
            )}
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
