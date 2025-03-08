import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer } from './reducers';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here as needed
});

// Root state type
export type RootState = ReturnType<typeof rootReducer>;

// Create the store
export const makeStore = () => {
  // Create store with thunk middleware
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the AppDispatch type from the store itself
export type AppDispatch = AppStore['dispatch'];

// Create a wrapper for Next.js
export const wrapper = createWrapper<AppStore>(makeStore, { 
  debug: process.env.NODE_ENV !== 'production' 
});
