import {Card} from '@mui/material';
import {FC} from 'react';
import styled from 'styled-components';

const CommentWrapperItem = styled(Card)`
  padding: 15px 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border: 1px solid #2196f3;
`;
const BlogItem: FC = () => {
  return <CommentWrapperItem>asd</CommentWrapperItem>;
};

export default BlogItem;
