import { createSlice } from '@reduxjs/toolkit';
import { fetchTechnicalIndicator } from './technicalAnalysisThunk';

import { StockDataType } from '@/types/technical-indicators';

export interface TechnicalIndicatorState {
  data: StockDataType | null;
  status: string;
  error: string | null;
}

const initialState: TechnicalIndicatorState = {
  data: null,
  status: 'idle',
  error: null,
};

export const technicalIndicatorSlice = createSlice({
  name: 'technicalIndicators',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnicalIndicator.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTechnicalIndicator.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = JSON.parse(action.payload.technical_data) as StockDataType;
      })
      .addCase(fetchTechnicalIndicator.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default technicalIndicatorSlice.reducer;

// Action creators are generated for each case reducer function
