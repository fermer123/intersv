import {TextField} from '@mui/material';
import {FieldProps} from 'formik';
import {FC, memo} from 'react';

// field, // { name, value, onChange, onBlur }
// form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
// type = "text",
// ...props my props
export interface IInputFormProps {
  label: string;
  // value: string;

  // eslint-disable-next-line react/require-default-props
  //   isValidEmail?: string;
  //   onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

const InputForm: FC<IInputFormProps & FieldProps> = ({
  label,
  // value,
  field,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // isValidEmail,
  // onBlur,
}) => {
  return (
    <TextField
      // name={name}
      // onBlur={onBlur}
      {...field}
      // value={value}
      // onChange={(e) => onChange(name, e.target.value)}
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
