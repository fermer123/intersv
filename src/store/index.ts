import {configureStore, combineReducers} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-named-as-default
import createSagaMiddleware from 'redux-saga';
// eslint-disable-next-line import/no-named-as-default
import BlogSlice from './slice/BlogSlice';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const rootReducer = combineReducers({
  Blog: BlogSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
