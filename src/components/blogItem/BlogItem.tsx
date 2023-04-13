import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import {useAppDispatch} from '@src/hooks/redux';
import {IBlog} from '@src/types/types';
import {FC, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {addRaiting, subtractRaiting} from '@src/store/slice/BlogSlice';

const CommentWrapperItem = styled(Card)`
  padding: 15px 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border: 1px solid #2196f3;
`;
const CommentWrapperItemTopContent = styled(CardContent)`
  padding: 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentWrapperItemTopContentInfo = styled(Box)`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CommentWrapperItemTopContentInfoRaiting = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommentWrapperItemBottomContent = styled(CardContent)`
  align-self: flex-end;
  padding: 0 0;
`;

const BlogItem: FC<IBlog> = ({name, raiting, id, comment, date}) => {
  const [updateTimePassed, setUpdateTimePassed] = useState<string>();
  const [open, setOpen] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const handleCommentOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  // eslint-disable-next-line consistent-return
  const dateHandler = (currentDate: number, commentDate: number) => {
    const min = 60000;
    const hour = 3600000;
    const day = 86400000;
    const timePassed = currentDate - commentDate;
    if (timePassed < hour) {
      return `${Math.floor(timePassed / min)} мин.`;
    }
    if (timePassed < day) {
      return `${Math.floor(timePassed / hour)} ч.`;
    }
    if (timePassed > day) {
      return `${Math.floor(timePassed / day)} д.`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTimePassed(dateHandler(Date.now(), date));
    }, 60000);
    return () => clearInterval(interval);
  }, [date, updateTimePassed]);

  return (
    <CommentWrapperItem>
      {raiting <= -10 && open ? (
        <Typography margin='0 auto' onClick={handleCommentOpen}>
          Открыть комментарий
        </Typography>
      ) : (
        <>
          <CommentWrapperItemTopContent>
            <CommentWrapperItemTopContentInfo>
              <Avatar>{[...name].slice(0, 1)}</Avatar>
              <Typography fontSize='2rem'>{name}</Typography>
            </CommentWrapperItemTopContentInfo>
            <CommentWrapperItemTopContentInfoRaiting>
              <Typography color='#2196f3'>Рейтинг: {raiting}</Typography>
              <ButtonGroup variant='outlined'>
                <Button onClick={() => dispatch(subtractRaiting(id))}>-</Button>
                <Button onClick={() => dispatch(addRaiting(id))}>+</Button>
              </ButtonGroup>
            </CommentWrapperItemTopContentInfoRaiting>
          </CommentWrapperItemTopContent>
          <Typography overflow-wrap='break-word'>{comment}</Typography>
          <CommentWrapperItemBottomContent>
            {updateTimePassed ?? '0 мин.'}
          </CommentWrapperItemBottomContent>
        </>
      )}
    </CommentWrapperItem>
  );
};

export default BlogItem;
