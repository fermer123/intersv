import {TextField} from '@mui/material';
import {FC, ChangeEvent, memo} from 'react';

interface IInputFormProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  // eslint-disable-next-line react/require-default-props
  isValidEmail?: (value: string) => boolean;
}

const InputForm: FC<IInputFormProps> = ({
  label,
  value,
  onChange,
  name,
  isValidEmail,
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
