import {Stack} from '@mui/material';
import {FC} from 'react';
import styled from 'styled-components';
import {useAppSelector} from '@src/hooks/redux';
import {IBlog} from '@src/types/types';
import BlogItem from '../blogItem/BlogItem';

const BlogItemsWrapper = styled(Stack)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const Blog: FC = () => {
  const comments = useAppSelector((state) => state.Blog.comments);

  return (
    <BlogItemsWrapper>
      {comments?.map((e: IBlog) => (
        <BlogItem key={e.id} {...e} />
      ))}
    </BlogItemsWrapper>
  );
};

export default Blog;
