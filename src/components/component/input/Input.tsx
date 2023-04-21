import {TextField} from '@mui/material';
import {FC, ChangeEvent, memo, FocusEvent} from 'react';

export interface IInputFormProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  // eslint-disable-next-line react/require-default-props
  isValidEmail?: string;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error: boolean;
}

const InputForm: FC<IInputFormProps> = ({
  label,
  value,
  onChange,
  name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isValidEmail,
  onBlur,
  error,
}) => {
  return (
    <TextField
      name={name}
      onBlur={onBlur}
      error={error}
      value={value}
      onChange={onChange}
      fullWidth
      label={label}
      variant='outlined'
      helperText={error ? 'Поле не должно быть пустым' : null}
      // helperText={error `${
      //   isValidEmail?.length ? или ${isValidEmail} : ''
      // }`}
    />
  );
};

export default memo(InputForm);
