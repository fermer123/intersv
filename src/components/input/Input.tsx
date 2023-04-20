import {TextField} from '@mui/material';
import {FC, ChangeEvent, memo, FocusEvent} from 'react';

export interface IInputFormProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  // eslint-disable-next-line react/require-default-props
  isValidEmail?: (value: string) => boolean;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error: boolean;
}

const InputForm: FC<IInputFormProps> = ({
  label,
  value,
  onChange,
  name,
  isValidEmail,
  onBlur,
  error,
}) => {
  const validate = (inputValue: string) => {
    if (inputValue === 'email') {
      return isValidEmail(value) && value.length
        ? ''
        : 'неверный E-mail или пустое значение';
    }
    if (inputValue === 'name') {
      return value.length ? '' : 'поле не должно быть пустым';
    }
    return value.length ? '' : 'поле не должно быть пустым';
  };

  return (
    <TextField
      value={value}
      onChange={onChange}
      fullWidth
      label={label}
      variant='outlined'
      helperText={validate(name)}
    />
  );
};

export default memo(InputForm);
