import {TextField} from '@mui/material';
import {FC, memo} from 'react';

export interface IInputFormProps {
  label: string;
  // value: string;
  onChange: (name: string, e: string) => void;
  name: string;

  // eslint-disable-next-line react/require-default-props
  //   isValidEmail?: string;
  //   onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

const InputForm: FC<IInputFormProps> = ({
  label,
  // value,
  onChange,
  name,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // isValidEmail,
  // onBlur,
}) => {
  return (
    <TextField
      name={name}
      // onBlur={onBlur}

      // value={value}
      onChange={(e) => onChange(name, e.target.value)}
      // onChange={handleChange}
      fullWidth
      label={label}
      variant='outlined'
      // helperText={error ? 'Поле не должно быть пустым' : null}
      // helperText={error `${
      //   isValidEmail?.length ? или ${isValidEmail} : ''
      // }`}
    />
  );
};

export default memo(InputForm);
