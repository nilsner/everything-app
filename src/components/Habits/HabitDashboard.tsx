// src/components/Habits/HabitDashboard.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchHabits, deleteHabit } from '../../features/habitSlice';
import { Link } from 'react-router-dom';

const HabitDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { habits, status } = useAppSelector((state) => state.habits);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHabits());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteHabit(id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Habit Tracker</h2>
      <Link
        to="/habits/new"
        className="inline-block mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add New Habit
      </Link>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {habits.map((habit) => (
            <li key={habit.id} className="mb-2 p-4 border rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <Link to={`/habits/${habit.id}`} className="text-xl font-semibold hover:underline">
                    {habit.name}
                  </Link>
                  <p className="text-gray-600">{habit.description}</p>
                </div>
                <div>
                  <Link
                    to={`/habits/edit/${habit.id}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(habit.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>Error loading habits.</p>}
    </div>
  );
};

export default HabitDashboard;
