// src/components/Habits/HabitDetail.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchHabitEntries, HabitEntry } from '../../features/habitEntriesSlice';
import HabitEntryForm from './HabitEntryForm';

const HabitDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const habit = useAppSelector((state) => state.habits.habits.find((h) => h.id === id));
  const { entries, status } = useAppSelector((state) => state.habitEntries);

  useEffect(() => {
    if (id) {
      dispatch(fetchHabitEntries(id));
    }
  }, [id, dispatch]);

  if (!habit) {
    return <p>Habit not found.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{habit.name}</h2>
      <p className="mb-4">{habit.description}</p>
      <HabitEntryForm habitId={habit.id} />
      <h3 className="text-xl font-semibold mt-8 mb-4">Entries</h3>
      {status === 'loading' && <p>Loading entries...</p>}
      {status === 'succeeded' && entries.length === 0 && <p>No entries yet.</p>}
      {status === 'succeeded' && entries.length > 0 && (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id} className="mb-2 p-4 border rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{new Date(entry.date).toLocaleString()}</p>
                  {entry.value !== undefined && (
                    <p>
                      {entry.value} {habit.unit || ''}
                    </p>
                  )}
                  {entry.note && <p className="text-gray-600">{entry.note}</p>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>Error loading entries.</p>}
    </div>
  );
};

export default HabitDetail;
