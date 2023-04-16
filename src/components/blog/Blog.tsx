import {Stack} from '@mui/material';
import {FC} from 'react';
import styled from 'styled-components';
import {useAppSelector} from '@src/hooks/redux';
import {IBlog} from '@src/types/types';
import BlogItem from '../blogItem/BlogItem';

interface IBlogProps {
  parentId: number;
}

const BlogItemsWrapper = styled(Stack)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 10 1rem;
  gap: 1rem;
`;

const Blog: FC<IBlogProps> = ({parentId}) => {
  const comments = useAppSelector((state) => state.Blog.comments);
  const isInArray = comments.filter((e) => e.parentId === parentId);
  return (
    <BlogItemsWrapper>
      {isInArray?.map((comment: IBlog) => (
        <BlogItem key={comment.id} {...comment} parentId={parentId} />
      ))}
    </BlogItemsWrapper>
  );
};

export default Blog;
