import { configureStore } from '@reduxjs/toolkit';
import technicalIndicatorReducer from './technicalIndicators/technicalIndicatorsSlice';
import llmInferenceReducer from './technicalIndicators/llmOutputSlice';
import promptStrategyReducer from './prompts/promptSlice';
//The store is instantiated by the configureStore function
//passes an object with reducers
export const store = configureStore({
  reducer: {
    technicalIndicator: technicalIndicatorReducer,
    llmInference: llmInferenceReducer,
    promptStrategy: promptStrategyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
//store.getState returns the current state of the store, its kind of like an object with all the
//slices, each slice being an object with the respective properties
//since store.getState is a function type would be () => {return this.state}
//ReturnType will get the type of the return of the function
//RootState will store the type of the global state

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
//store.dispatch is a function which takes an action and payload as input and returns
//void
