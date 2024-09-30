// src/components/Habits/HabitEntryForm.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addHabitEntry } from '../../features/habitEntriesSlice';

interface HabitEntryFormProps {
  habitId: string;
}

const HabitEntryForm: React.FC<HabitEntryFormProps> = ({ habitId }) => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16)); // For datetime-local input
  const [value, setValue] = useState<number | undefined>();
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addHabitEntry({
        habitId,
        entry: {
          date,
          value,
          note,
        },
      })
    );
    // Reset form fields
    setDate(new Date().toISOString().slice(0, 16));
    setValue(undefined);
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-8">
      <h3 className="text-xl font-semibold mb-4">Log Entry</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date and Time</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Value (Optional)</label>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => setValue(Number(e.target.value))}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Note (Optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Add Entry
      </button>
    </form>
  );
};

export default HabitEntryForm;
