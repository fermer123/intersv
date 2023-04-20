import {Container, Stack} from '@mui/material';
import styled from 'styled-components';
import useInput from '@src/hooks/Input';
import {useCallback, FC, FocusEvent, useState} from 'react';
import {useAppDispatch} from '@src/hooks/redux';
import {addNewBlogItem} from '@src/store/slice/BlogSlice';
import {v4 as uuidv4} from 'uuid';
import Input from '../input/Input';
import PostButton from '../PostButton/PostButton';

interface IHeaderProps {
  parentId: number;
}

const InputFormWrapper = styled(Container)`
  padding: 0 10;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TopContent = styled(Stack)`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

const Header: FC<IHeaderProps> = ({parentId}) => {
  const dispatch = useAppDispatch();
  const name = useInput();
  const email = useInput();
  const comment = useInput();
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorComment, setErrorComment] = useState<boolean>(false);

  const isValidEmail = useCallback(
    (validateEmail: string) => {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(validateEmail).toLowerCase())) {
        setErrorEmail(false);
      }
    },

    // eslint-disable-next-line no-useless-escape
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email.value],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const blurHandlerEmail = (e: FocusEvent<HTMLInputElement>) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case 'name':
        setErrorName(true);
        break;
      case 'comment':
        setErrorComment(true);
        break;
      case 'email':
        setErrorEmail(true);
        break;
    }
  };

  const postDataMemo = useCallback(() => {
    if (
      name.value &&
      email.value &&
      comment.value &&
      isValidEmail(email.value)
    ) {
      dispatch(
        addNewBlogItem({
          parentId,
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
  }, [comment, dispatch, email, isValidEmail, name, parentId]);

  return (
    <InputFormWrapper>
      <TopContent>
        <Input
          error={errorName}
          onBlur={blurHandler}
          label='Введите имя'
          name='name'
          {...name}
        />
        <Input
          error={errorEmail}
          onBlur={blurHandler}
          label='Введите e-mail'
          isValidEmail={isValidEmail}
          name='email'
          {...email}
        />
      </TopContent>
      <Input
        error={errorComment}
        onBlur={blurHandler}
        label='Введите комментарий'
        name='comment'
        {...comment}
      />
      <PostButton data-testID='postData' postData={postDataMemo} />
    </InputFormWrapper>
  );
};

export default Header;
