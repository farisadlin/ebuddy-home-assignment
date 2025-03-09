import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { userReducer } from './reducers';
import authReducer from './authSlice';

// Create the store
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      auth: authReducer,
      // Add other reducers here as needed
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Infer the RootState type from the store
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the AppDispatch type from the store itself
export type AppDispatch = AppStore['dispatch'];

// Create a wrapper for Next.js
export const wrapper = createWrapper<AppStore>(makeStore, { 
  debug: process.env.NODE_ENV !== 'production' 
});
