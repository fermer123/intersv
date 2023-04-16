import {useAppDispatch, useAppSelector} from '@src/hooks/redux';
import {FC, useEffect} from 'react';
import {Stack} from '@mui/material';
import styled from 'styled-components';
import {fetchData} from '@src/store/slice/BlogSlice';
import PostItem from '../postItem/PostItem';

const PostsItemsWrapper = styled(Stack)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const Posts: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.Blog.posts);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <PostsItemsWrapper>
      {posts?.map((e) => (
        <PostItem key={e.id} {...e} />
      ))}
    </PostsItemsWrapper>
  );
};

export default Posts;
