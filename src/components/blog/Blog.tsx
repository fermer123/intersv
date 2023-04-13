import {Stack} from '@mui/material';
import {FC} from 'react';
import styled from 'styled-components';
import {useAppSelector} from '@src/hooks/redux';

import BlogItem from '../blogItem/BlogItem';

const BlogItemsWrapper = styled(Stack)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const Blog: FC = () => {
  const {blog} = useAppSelector((state) => state.Blog);

  return (
    <BlogItemsWrapper>
      {blog.map((e) => (
        <BlogItem key={e.id} {...e} />
      ))}
    </BlogItemsWrapper>
  );
};

export default Blog;
