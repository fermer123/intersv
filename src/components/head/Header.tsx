import {Container, Stack} from '@mui/material';
import styled from 'styled-components';
import useInput from '@src/hooks/Input';
import {useCallback, FC, FocusEvent, useState, ChangeEvent} from 'react';
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
  const [errorEmailValidate, setErrorEmailValidate] = useState<string>('');
  const [errorComment, setErrorComment] = useState<boolean>(false);

  const isValidEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      email.setValue(e.target.value);
      const re =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(e.target.value).toLowerCase())) {
        setErrorEmailValidate('неверный E-mail');
      }
      setErrorEmailValidate('');

      setErrorEmail(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email.value, errorEmail, errorEmailValidate],
  );

  const isValidComment = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      comment.setValue(e.target.value);
      if (comment.value.length < 2) {
        setErrorComment(true);
      } else {
        setErrorComment(false);
      }
    },
    [comment, setErrorComment],
  );

  const isValidName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      name.setValue(e.target.value);
      if (name.value.length < 2) {
        setErrorName(true);
      } else {
        setErrorName(false);
      }
    },
    [name],
  );

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
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
    if (errorName && errorComment && errorEmail && !errorEmailValidate.length) {
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
  }, [
    comment,
    dispatch,
    email,
    errorComment,
    errorEmail,
    errorEmailValidate.length,
    errorName,
    name,
    parentId,
  ]);

  return (
    <InputFormWrapper>
      <TopContent>
        <Input
          error={errorName}
          onBlur={blurHandler}
          label='Введите имя'
          name='name'
          value={name.value}
          onChange={isValidName}
        />
        <Input
          error={errorEmail}
          onBlur={blurHandler}
          label='Введите e-mail'
          isValidEmail={errorEmailValidate}
          name='email'
          value={email.value}
          onChange={isValidEmail}
        />
      </TopContent>
      <Input
        error={errorComment}
        onBlur={blurHandler}
        label='Введите комментарий'
        name='comment'
        value={comment.value}
        onChange={isValidComment}
      />
      <PostButton data-testID='postData' postData={postDataMemo} />
    </InputFormWrapper>
  );
};

export default Header;
