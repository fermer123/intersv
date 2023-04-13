import {Stack} from '@mui/material';
import {FC} from 'react';
import styled from 'styled-components';
import BlogItem from '../blogItem/BlogItem';

const BlogItemsWrapper = styled(Stack)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const BlogItems: FC = () => {
  return (
    <BlogItemsWrapper>
      <BlogItem />
    </BlogItemsWrapper>
  );
};

export default BlogItems;
