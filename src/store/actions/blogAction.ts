import {IPost} from '@src/types/types';
import axios from '@src/axios';
import {AppDispatch} from '..';
import {BlogSlice} from '../slice/BlogSlice';

const fetchPost = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(BlogSlice.actions.fetching());
      const resp = await axios.get<IPost[]>('posts');
      dispatch(BlogSlice.actions.fetchSuccess(resp.data));
    } catch (e) {
      dispatch(BlogSlice.actions.fetchError());
    }
  };
};
export default fetchPost;
