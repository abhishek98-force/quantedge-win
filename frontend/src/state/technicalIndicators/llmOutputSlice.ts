import { createSlice } from '@reduxjs/toolkit';
import { fetchTechnicalIndicator } from './technicalAnalysisThunk';

import { LlmInferenceType } from '@/types/technical-indicators';

export interface LlmInferenceDataState {
  data: LlmInferenceType[] | null;
  status: string;
  error: string | null;
}

const initialState: LlmInferenceDataState = {
  data: null,
  status: 'idle',
  error: null,
};

export const llmInferenceSlice = createSlice({
  name: 'llmInference',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnicalIndicator.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTechnicalIndicator.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.llama_response as LlmInferenceType[];
      })
      .addCase(fetchTechnicalIndicator.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default llmInferenceSlice.reducer;

// Action creators are generated for each case reducer function
