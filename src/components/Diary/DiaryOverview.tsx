// src/components/Diary/DiaryOverview.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDiaryEntries, deleteDiaryEntry } from '../../features/diarySlice';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

const DiaryOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const { entries, status } = useAppSelector((state: RootState) => state.diary);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'idle' && user) {
      dispatch(fetchDiaryEntries());
    }
  }, [status, dispatch, user]);

  const handleDelete = (id: string) => {
    dispatch(deleteDiaryEntry(id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Diary Entries</h2>
      <Link
        to="/diary/new"
        className="inline-block mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add New Entry
      </Link>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {entries.map(entry => (
            <li key={entry.id} className="mb-2 p-4 border rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <Link to={`/diary/${entry.id}`} className="text-xl font-semibold hover:underline">
                    {new Date(entry.date).toLocaleDateString()}
                  </Link>
                  <p className="text-gray-600">{entry.content.substring(0, 100)}...</p>
                </div>
                <div>
                  <Link
                    to={`/diary/edit/${entry.id}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(entry.id)}
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
      {status === 'failed' && <p>Error loading entries.</p>}
    </div>
  );
};

export default DiaryOverview;
