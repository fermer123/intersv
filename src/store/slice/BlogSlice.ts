import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IBlog} from '@src/types/types';

export interface IBlogState {
  blog: IBlog[];
}

const initialState: IBlogState = {
  blog: [
    {
      id: 1,
      comment: 'asd',
      email: 'qwe@mail.ru',
      raiting: -9,
      name: 'qwe',
      date: 12102023,
    },
  ],
};

export const BlogSlice = createSlice({
  name: 'BlogSlice',
  initialState,
  reducers: {
    addNewBlogItem: (state, action: PayloadAction<IBlog>) => {
      state.blog.push(action.payload);
    },
    addRaiting: (state, action: PayloadAction<number>) => {
      const element = state.blog.find((e) => e.id === action.payload);
      element.raiting += 1;
    },
    subtractRaiting: (state, action: PayloadAction<number>) => {
      const element = state.blog.find((e) => e.id === action.payload);
      element.raiting -= 1;
    },
  },
});
export const {addNewBlogItem, addRaiting, subtractRaiting} = BlogSlice.actions;
export default BlogSlice.reducer;
