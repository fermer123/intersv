import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import {FC, memo} from 'react';

export interface IPostButtonProps {
  onSubmit: () => void;
  disabled: boolean;
}

const PostButton: FC<IPostButtonProps> = ({disabled, onSubmit}) => {
  return (
    <Button
      type='submit'
      onClick={onSubmit}
      disabled={disabled}
      variant='outlined'
      endIcon={<SendIcon />}>
      Send
    </Button>
  );
};

export default memo(PostButton);
