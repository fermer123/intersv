/* eslint-disable no-param-reassign */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IBlog, IPost} from '@src/types/types';

export interface IBlogState {
  error: boolean;
  loading: boolean;
  posts: IPost[];
  comments: IBlog[];
}

const initialState: IBlogState = {
  loading: false,
  error: false,
  posts: [],
  comments: [],
};

export const BlogSlice = createSlice({
  name: 'BlogSlice',
  initialState,
  reducers: {
    fetchData: (state) => {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<IPost[]>) {
      state.loading = false;
      state.posts = action.payload;
      state.error = false;
    },
    fetchDataError: (state) => {
      state.loading = false;
      state.error = true;
    },
    addNewBlogItem: (state, action: PayloadAction<IBlog>) => {
      state.comments.push(action.payload);
    },
    addRaiting: (
      state,
      action: PayloadAction<{id: number; parentId: number}>,
    ) => {
      const element = state.comments.find(
        (e) => e.id === action.payload.parentId && e.id === action.payload.id,
      );
      element.raiting += 1;
    },
    subtractRaiting: (
      state,
      action: PayloadAction<{id: number; parentId: number}>,
    ) => {
      const element = state.comments.find(
        (e) => e.id === action.payload.parentId && e.id === action.payload.id,
      );
      element.raiting -= 1;
    },
  },
});
export const {
  addNewBlogItem,
  addRaiting,
  subtractRaiting,
  fetchData,
  fetchSuccess,
  fetchDataError,
} = BlogSlice.actions;
export default BlogSlice.reducer;
