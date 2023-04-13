import {Container, Stack} from '@mui/material';
import styled from 'styled-components';
import useInput from '@src/hooks/Input';
import {useCallback} from 'react';
import {useAppDispatch} from '@src/hooks/redux';
import {addNewBlogItem} from '@src/store/slice/BlogSlice';
import {v4 as uuidv4} from 'uuid';
import Input from '../input/Input';
import PostButton from '../PostButton/PostButton';

const InputFormWrapper = styled(Container)`
  padding: 0;
  margin: 30 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = () => {
  const dispatch = useAppDispatch();
  const name = useInput();
  const email = useInput();
  const comment = useInput();

  const isValidEmail = useCallback(
    (validateEmail: string) =>
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        validateEmail,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email.value],
  );

  const postDataMemo = useCallback(() => {
    if (
      name.value &&
      email.value &&
      comment.value &&
      isValidEmail(email.value)
    ) {
      dispatch(
        addNewBlogItem({
          id: parseInt(uuidv4(), 36),
          name: name.value,
          comment: comment.value,
          email: email.value,
          raiting: 0,
          date: Date.now(),
        }),
      );

      name.setValue('');
      comment.setValue('');
      email.setValue('');
    }
  }, [comment, dispatch, email, isValidEmail, name]);

  return (
    <InputFormWrapper>
      <Stack direction='row' spacing={2}>
        <Input label='Введите имя' name='name' {...name} />
        <Input
          label='Введите e-mail'
          isValidEmail={isValidEmail}
          name='email'
          {...email}
        />
      </Stack>
      <Input label='Введите комментарий' name='comment' {...comment} />
      <PostButton postData={postDataMemo} />
    </InputFormWrapper>
  );
};

export default Header;
