import {Card, CardContent, Typography} from '@mui/material';
import {IPost} from '@src/types/types';
import {FC} from 'react';
import styled from 'styled-components';
import Header from '../head/Header';
import Blog from '../blog/Blog';

const PostWrapperItem = styled(Card)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border: 1px solid #2196f3;
`;

const PostWrapperItemProps = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
`;

const PostItem: FC<IPost> = ({id, body, title}) => {
  return (
    <PostWrapperItem>
      <CardContent>
        <PostWrapperItemProps>{title}</PostWrapperItemProps>
        <PostWrapperItemProps>{body}</PostWrapperItemProps>
      </CardContent>
      <Header parentId={id} />
      <Blog parentId={id} />
    </PostWrapperItem>
  );
};

export default PostItem;
