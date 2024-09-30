// src/features/diarySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { RootState } from '../redux/store';

export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
}

interface DiaryState {
  entries: DiaryEntry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: DiaryState = {
  entries: [],
  status: 'idle',
};

export const fetchDiaryEntries = createAsyncThunk<DiaryEntry[], void, { state: RootState }>(
    'diary/fetchEntries',
    async (_, { getState }) => {
      const userId = getState().auth.user?.uid;
      if (!userId) throw new Error('User not authenticated');
      const querySnapshot = await getDocs(collection(db, 'users', userId, 'diary'));
      const entries = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as DiaryEntry)
      );
      return entries;
    }
  );

export const addDiaryEntry = createAsyncThunk<DiaryEntry, Omit<DiaryEntry, 'id'>, { state: RootState }>(
    'diary/addEntry',
    async (entry, { getState }) => {
      const userId = getState().auth.user?.uid;
      if (!userId) throw new Error('User not authenticated');
      const docRef = await addDoc(collection(db, 'users', userId, 'diary'), entry);
      return { id: docRef.id, ...entry };
    }
  );

export const updateDiaryEntry = createAsyncThunk<DiaryEntry, DiaryEntry, { state: RootState }>(
  'diary/updateEntry',
  async (entry, { getState }) => {
    const userId = getState().auth.user?.uid;
    if (!userId) throw new Error('User not authenticated');
    const docRef = doc(db, 'diary', entry.id);
    await updateDoc(docRef, { date: entry.date, content: entry.content });
    return entry;
  }
);

export const deleteDiaryEntry = createAsyncThunk<string, string, { state: RootState }>(
  'diary/deleteEntry',
  async (id, { getState }) => {
    const userId = getState().auth.user?.uid;
    if (!userId) throw new Error('User not authenticated');
    const docRef = doc(db, 'diary', id);
    await deleteDoc(docRef);
    return id;
  }
);

const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDiaryEntries.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchDiaryEntries.fulfilled, (state, action: PayloadAction<DiaryEntry[]>) => {
          state.status = 'succeeded';
          state.entries = action.payload;
        })
        .addCase(fetchDiaryEntries.rejected, (state) => {
          state.status = 'failed';
        })
        .addCase(addDiaryEntry.fulfilled, (state, action: PayloadAction<DiaryEntry>) => {
          state.entries.push(action.payload);
        })
        .addCase(updateDiaryEntry.fulfilled, (state, action: PayloadAction<DiaryEntry>) => {
          const index = state.entries.findIndex((entry) => entry.id === action.payload.id);
          if (index !== -1) {
            state.entries[index] = action.payload;
          }
        })
        .addCase(deleteDiaryEntry.fulfilled, (state, action: PayloadAction<string>) => {
          state.entries = state.entries.filter((entry) => entry.id !== action.payload);
        });
    },
  });  

export default diarySlice.reducer;
