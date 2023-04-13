import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IBlog} from '@src/types/types';

interface IBlogState {
  loading: boolean;
  error: boolean;
  blog: IBlog[];
}

const initialState: IBlogState = {
  loading: false,
  error: false,
  blog: [],
};

export const BlogSlice = createSlice({
  name: 'BlogSlice',
  initialState,
  reducers: {
    addNewBlogItem: (state, action: PayloadAction<IBlog>) => {
      state.blog.push(action.payload);
    },
  },
});

export default BlogSlice.reducer;
