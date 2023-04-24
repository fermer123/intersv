import {TextField} from '@mui/material';
import {FieldProps} from 'formik';
import {FC, memo} from 'react';

export interface IInputFormProps {
  label: string;
  error: string;
}

const InputForm: FC<IInputFormProps & FieldProps> = ({
  label,
  error,
  field,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  form,
}) => {
  return (
    <TextField
      {...field} // { name, value, onChange, onBlur }
      onBlur={(e) => form.handleBlur(e)}
      fullWidth
      label={label}
      variant='outlined'
      error={!!error}
      helperText={error}
    />
  );
};

export default memo(InputForm);
