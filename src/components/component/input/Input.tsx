import {TextField} from '@mui/material';
import {FieldProps} from 'formik';
import {FC, memo} from 'react';

export interface IInputFormProps {
  label: string;
  error: string;
  touched: boolean;
}

const InputForm: FC<IInputFormProps & FieldProps> = ({
  label,
  error,
  field,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  form,
  touched,
}) => {
  return (
    <TextField
      {...field} // { name, value, onChange, onBlur }
      fullWidth
      // onBlur={(e) => handleBlur(e)}
      label={label}
      variant='outlined'
      error={!!error && !!touched}
      helperText={error}
    />
  );
};

export default memo(InputForm);
