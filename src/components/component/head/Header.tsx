import {Container, Stack} from '@mui/material';
import styled from 'styled-components';
import {FC} from 'react';
import {useAppDispatch} from '@src/hooks/redux';
import {addNewBlogItem} from '@src/store/slice/BlogSlice';
import {v4 as uuidv4} from 'uuid';
import {Field, Form, Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {IFormValue} from '@src/types/types';
import Input from '../input/Input';
import PostButton from '../postButton/PostButton';

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

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Слишком короткое имя')
      .max(20, 'Слишком длинное имя')
      .required('Поле не должо быть пустым'),
    comment: Yup.string()
      .min(3, 'Слишком короткий комментарий')
      .max(100, 'Слишком длинный комментарий')
      .required('Поле не должо быть пустым'),
    email: Yup.string()
      .email('Неверный email')
      .required('Поле не должо быть пустым'),
  });

  const initialValues: IFormValue = {
    name: '',
    email: '',
    comment: '',
  };
  const onSubmit = (values: IFormValue, actions: FormikHelpers<IFormValue>) => {
    dispatch(
      addNewBlogItem({
        parentId,
        id: parseInt(uuidv4(), 36),
        name: values.name,
        comment: values.comment,
        email: values.email,
        raiting: 0,
        date: Date.now(),
      }),
    );
    actions.resetForm();
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({errors, touched, isSubmitting, dirty, handleSubmit}) => (
        <Form>
          <InputFormWrapper>
            <TopContent>
              <Field
                error={errors.name}
                touched={touched.name}
                label='Введите имя'
                name='name'
                component={Input}
              />
              <Field
                error={errors.email}
                touched={touched.email}
                label='Введите email'
                name='email'
                component={Input}
              />
            </TopContent>
            <Field
              error={errors.comment}
              touched={touched.comment}
              label='Введите комментарий'
              name='comment'
              component={Input}
            />

            <PostButton
              disabled={
                !dirty ||
                isSubmitting ||
                !!(errors.email && touched.email) ||
                !!(errors.name && touched.name) ||
                !!(errors.comment && touched.comment)
              }
              onSubmit={handleSubmit}
            />
          </InputFormWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default Header;
