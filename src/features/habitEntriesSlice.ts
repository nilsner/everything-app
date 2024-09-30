// src/features/habitEntriesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { RootState } from '../redux/store';

export interface HabitEntry {
  id: string;
  habitId: string;
  date: string;
  value?: number;
  note?: string;
}

interface HabitEntriesState {
  entries: HabitEntry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: HabitEntriesState = {
  entries: [],
  status: 'idle',
};

// Async thunks
export const fetchHabitEntries = createAsyncThunk<HabitEntry[], string, { state: RootState }>(
  'habitEntries/fetchHabitEntries',
  async (habitId, { getState }) => {
    const userId = getState().auth.user?.uid;
    if (!userId) throw new Error('User not authenticated');
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'habits', habitId, 'entries'));
    const entries = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as HabitEntry));
    return entries;
  }
);

export const addHabitEntry = createAsyncThunk<
  HabitEntry,
  { habitId: string; entry: Omit<HabitEntry, 'id' | 'habitId'> },
  { state: RootState }
>('habitEntries/addHabitEntry', async ({ habitId, entry }, { getState }) => {
  const userId = getState().auth.user?.uid;
  if (!userId) throw new Error('User not authenticated');
  const docRef = await addDoc(collection(db, 'users', userId, 'habits', habitId, 'entries'), entry);
  return { id: docRef.id, habitId, ...entry };
});

const habitEntriesSlice = createSlice({
  name: 'habitEntries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHabitEntries.fulfilled, (state, action: PayloadAction<HabitEntry[]>) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchHabitEntries.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addHabitEntry.fulfilled, (state, action: PayloadAction<HabitEntry>) => {
        state.entries.push(action.payload);
      });
  },
});

export default habitEntriesSlice.reducer;
