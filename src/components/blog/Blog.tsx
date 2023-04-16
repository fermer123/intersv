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
  gap: 1rem;
`;

const Blog: FC<IBlogProps> = ({parentId}) => {
  const comments = useAppSelector((state) => state.Blog.comments);

  return (
    <BlogItemsWrapper>
      {comments?.map((comment: IBlog) => {
        const isInArray = comments.some((e) => e.parentId === parentId);
        return isInArray ? (
          <BlogItem key={comment.id} {...comment} parentId={parentId} />
        ) : null;
      })}
    </BlogItemsWrapper>
  );
};

export default Blog;
