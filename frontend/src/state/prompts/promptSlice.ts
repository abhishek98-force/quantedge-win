import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Strategy } from '@/types/prompt-strategies-type';
export interface TechnicalIndicatorState {
  data: Strategy[] | null;
  status: string;
  error: string | null;
}

const initialState: TechnicalIndicatorState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchPromptStrategies = createAsyncThunk(
  'prompts/fetchPromptStrategies', // Action type
  async () => {
    const response = await fetch(`http://localhost:8000/api/strategies`); // Replace with your backend endpoint
    const data = await response.json();
    return data;
  }
);

export const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromptStrategies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchPromptStrategies.fulfilled,
        (state, action: PayloadAction<Strategy[]>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        }
      )
      .addCase(fetchPromptStrategies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default promptSlice.reducer;

// Action creators are generated for each case reducer function
