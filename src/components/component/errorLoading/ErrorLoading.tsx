import {Typography} from '@mui/material';
import {FC} from 'react';

interface IErrorLoadingProps {
  text: string;
}
const ErrorLoading: FC<IErrorLoadingProps> = ({text}) => {
  return (
    <Typography textAlign='center' variant='h1'>
      {text}
    </Typography>
  );
};

export default ErrorLoading;
