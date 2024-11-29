import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTechnicalIndicator = createAsyncThunk(
  'technicalIndicators/fetchTechnicalIndicator', // Action type
  async (queryParmaeters: { [key: string]: string }) => {
    const queryString = new URLSearchParams(queryParmaeters).toString();
    const response = await fetch(
      `http://localhost:8000/api/fectchTicker?${queryString}`
    ); // Replace with your backend endpoint
    const data = await response.json();
    return data;
  }
);
