import {put, call, takeLatest} from 'redux-saga/effects';
import {IPost} from '@src/types/types';

import axios from 'axios';
import {BlogSlice} from '../slice/BlogSlice';

function requestGetPosts() {
  return axios.get('https://jsonplaceholder.typicode.com/posts');
}

function* fetchingSaga() {
  try {
    BlogSlice.actions.fetchData();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {data}: {data: IPost[]} = yield call(requestGetPosts);
    yield put(BlogSlice.actions.fetchSuccess(data));
  } catch {
    BlogSlice.actions.fetchDataError();
  }
}

function* RootSaga() {
  yield takeLatest(BlogSlice.actions.fetchData.type, fetchingSaga);
}

export default RootSaga;