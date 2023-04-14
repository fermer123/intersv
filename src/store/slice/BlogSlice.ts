import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IBlog} from '@src/types/types';

export interface IBlogState {
  error: boolean;
  loading: boolean;
  posts: [
    {
      id: number;
      title: string;
      body: string;
      comments: IBlog[] | null;
    },
  ];
}

const initialState: IBlogState = {
  loading: false,
  error: false,
  posts: [
    {
      id: 1,
      body: '123',
      title: '123',
      comments: [
        {
          id: 1,
          comment: 'asd',
          email: 'qwe@mail.ru',
          raiting: -9,
          name: 'qwe',
          date: 12102023,
        },
      ],
    },
  ],
};

interface IaddNewBlogItem {
  comment: IBlog;
  id: number;
}

export const BlogSlice = createSlice({
  name: 'BlogSlice',
  initialState,
  reducers: {
    addNewBlogItem: (state, action: PayloadAction<IaddNewBlogItem>) => {
      const element = state.posts.find((e) => e.id === action.payload.id);
      element?.comments.push(action.payload.comment);
    },
    addRaiting: (
      state,
      action: PayloadAction<{id: number; ParentId: number}>,
    ) => {
      const ParentElement = state.posts.find(
        (e) => e.id === action.payload.ParentId,
      );
      const element = ParentElement.comments.find(
        (e) => e.id === action.payload.id,
      );
      element.raiting += 1;
    },
    subtractRaiting: (
      state,
      action: PayloadAction<{id: number; ParentId: number}>,
    ) => {
      const ParentElement = state.posts.find(
        (e) => e.id === action.payload.ParentId,
      );
      const element = ParentElement.comments.find(
        (e) => e.id === action.payload.id,
      );
      element.raiting -= 1;
    },
  },
});
export const {addNewBlogItem, addRaiting, subtractRaiting} = BlogSlice.actions;
export default BlogSlice.reducer;
