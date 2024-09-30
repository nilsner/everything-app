// src/pages/DiaryFormPage.tsx
import React from 'react';
import DiaryForm from '../components/Diary/DiaryForm';

const DiaryFormPage: React.FC = () => {
  const isEdit = window.location.pathname.includes('edit');
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Entry' : 'New Entry'}</h2>
      <DiaryForm isEdit={isEdit} />
    </div>
  );
};

export default DiaryFormPage;
