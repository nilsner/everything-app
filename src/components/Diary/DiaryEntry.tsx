// src/components/Diary/DiaryEntry.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useParams, Link } from 'react-router-dom';

const DiaryEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const entry = useSelector((state: RootState) =>
    state.diary.entries.find(entry => entry.id === id)
  );

  if (!entry) {
    return <p>Entry not found.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{new Date(entry.date).toLocaleDateString()}</h2>
      <p className="mb-4">{entry.content}</p>
      <Link
        to={`/diary/edit/${entry.id}`}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
      >
        Edit Entry
      </Link>
      <Link
        to="/diary"
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Back to Diary
      </Link>
    </div>
  );
};

export default DiaryEntry;
