import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addDiaryEntry, updateDiaryEntry } from '../../features/diarySlice';
import { useNavigate, useParams } from 'react-router-dom';

interface DiaryFormProps {
  isEdit?: boolean;
}

const DiaryForm: React.FC<DiaryFormProps> = ({ isEdit = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const entryToEdit = useAppSelector((state) =>
    state.diary.entries.find((entry) => entry.id === id)
  );

  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isEdit && entryToEdit) {
      setDate(entryToEdit.date);
      setContent(entryToEdit.content);
    }
  }, [isEdit, entryToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && id) {
      dispatch(updateDiaryEntry({ id, date, content }));
    } else {
      dispatch(addDiaryEntry({ date, content }));
    }
    navigate('/diary');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Entry</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          rows={6}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {isEdit ? 'Update Entry' : 'Save Entry'}
      </button>
    </form>
  );
};

export default DiaryForm;
