import {configureStore, combineReducers} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-named-as-default
import BlogSlice from './slice/BlogSlice';

const rootReducer = combineReducers({
  Blog: BlogSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
