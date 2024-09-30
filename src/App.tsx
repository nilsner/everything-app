// src/App.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { setUser } from './features/authSlice';
import { useAppSelector } from './redux/hooks';
import { Navigate } from 'react-router-dom';
import PreviewPage from './pages/PreviewPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import DiaryPage from './pages/DiaryPage';
import DiaryEntryPage from './pages/DiaryEntryPage';
import DiaryFormPage from './pages/DiaryFormPage';
import HabitDashboard from './components/Habits/HabitDashboard';
import HabitForm from './components/Habits/HabitForm';
import HabitDetail from './components/Habits/HabitDetail';
// Import other pages as needed

const App: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { colorScheme, backgroundImage } = useSelector((state: RootState) => state.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      dispatch(setUser(currentUser));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        colorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <Router>
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* Add other routes as needed */}
            {!user ? (
              // Routes for unauthenticated users
              <>
                <Route path="/" element={<PreviewPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* Redirect all other routes to the preview page */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              // Routes for authenticated users
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/diary" element={<PrivateRoute element={<DiaryPage />} />} />
                <Route path="/diary" element={<PrivateRoute element={<DiaryFormPage />} />} />
                <Route path="/diary/new" element={<PrivateRoute element={<DiaryFormPage />} />} />
                <Route path="/diary/edit/:id" element={<PrivateRoute element={<DiaryFormPage />} />} />
                <Route path="/diary/:id" element={<PrivateRoute element={<DiaryEntryPage />} />} />
                <Route path="/habits" element={<HabitDashboard />} />
                <Route path="/habits/new" element={<HabitForm />} />
                <Route path="/habits/edit/:id" element={<HabitForm isEdit />} />
                <Route path="/habits/:id" element={<HabitDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
