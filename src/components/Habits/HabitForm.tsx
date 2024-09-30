// src/components/Habits/HabitForm.tsx
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addHabit, updateHabit, Habit } from '../../features/habitSlice';
import { useNavigate, useParams } from 'react-router-dom';

interface HabitFormProps {
  isEdit?: boolean;
}

const HabitForm: React.FC<HabitFormProps> = ({ isEdit = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const habitToEdit = useAppSelector((state) =>
    state.habits.habits.find((habit) => habit.id === id)
  );

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'good' | 'bad'>('good');
  const [goal, setGoal] = useState<number | undefined>();
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (isEdit && habitToEdit) {
      setName(habitToEdit.name);
      setDescription(habitToEdit.description || '');
      setType(habitToEdit.type);
      setGoal(habitToEdit.goal);
      setUnit(habitToEdit.unit || '');
    }
  }, [isEdit, habitToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const habitData: Omit<Habit, 'id'> = {
      name,
      description,
      type,
      goal,
      unit,
    };
    if (isEdit && id) {
      dispatch(updateHabit({ id, ...habitData }));
    } else {
      dispatch(addHabit(habitData));
    }
    navigate('/habits');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Habit Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          rows={3}
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'good' | 'bad')}
          className="mt-1 block w-full border-gray-300 rounded-md"
        >
          <option value="good">Good Habit</option>
          <option value="bad">Bad Habit</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Goal (Optional)</label>
        <input
          type="number"
          value={goal || ''}
          onChange={(e) => setGoal(Number(e.target.value))}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Unit (Optional)</label>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {isEdit ? 'Update Habit' : 'Save Habit'}
      </button>
    </form>
  );
};

export default HabitForm;
