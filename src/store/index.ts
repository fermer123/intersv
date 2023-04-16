import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-named-as-default
import createSagaMiddleware from 'redux-saga';
// eslint-disable-next-line import/no-named-as-default
import BlogSlice from './slice/BlogSlice';
import RootSaga from './postsSaga/PostSaga';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  Blog: BlogSlice,
});

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware],
  });
  sagaMiddleware.run(RootSaga);
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
