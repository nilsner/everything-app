// src/features/habitSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { RootState } from '../redux/store';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  type: 'good' | 'bad';
  goal?: number;
  unit?: string;
}

interface HabitState {
  habits: Habit[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: HabitState = {
  habits: [],
  status: 'idle',
};

// Async thunks
export const fetchHabits = createAsyncThunk<Habit[], void, { state: RootState }>(
  'habits/fetchHabits',
  async (_, { getState }) => {
    const userId = getState().auth.user?.uid;
    if (!userId) throw new Error('User not authenticated');
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'habits'));
    const habits = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Habit));
    return habits;
  }
);

export const addHabit = createAsyncThunk<Habit, Omit<Habit, 'id'>, { state: RootState }>(
  'habits/addHabit',
  async (habit, { getState }) => {
    const userId = getState().auth.user?.uid;
    if (!userId) throw new Error('User not authenticated');
    const docRef = await addDoc(collection(db, 'users', userId, 'habits'), habit);
    return { id: docRef.id, ...habit };
  }
);

export const updateHabit = createAsyncThunk<Habit, Habit, { state: RootState }>(
  'habits/updateHabit',
  async (habit, { getState }) => {
    const userId = getState().auth.user?.uid;
    if (!userId) throw new Error('User not authenticated');
    const docRef = doc(db, 'users', userId, 'habits', habit.id);
    await updateDoc(docRef, { ...habit });
    return habit;
  }
);

export const deleteHabit = createAsyncThunk<string, string, { state: RootState }>(
  'habits/deleteHabit',
  async (habitId, { getState }) => {
    const userId = getState().auth.user?.uid;
    if (!userId) throw new Error('User not authenticated');
    const docRef = doc(db, 'users', userId, 'habits', habitId);
    await deleteDoc(docRef);
    return habitId;
  }
);

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHabits.fulfilled, (state, action: PayloadAction<Habit[]>) => {
        state.status = 'succeeded';
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addHabit.fulfilled, (state, action: PayloadAction<Habit>) => {
        state.habits.push(action.payload);
      })
      .addCase(updateHabit.fulfilled, (state, action: PayloadAction<Habit>) => {
        const index = state.habits.findIndex((habit) => habit.id === action.payload.id);
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(deleteHabit.fulfilled, (state, action: PayloadAction<string>) => {
        state.habits = state.habits.filter((habit) => habit.id !== action.payload);
      });
  },
});

export default habitSlice.reducer;
