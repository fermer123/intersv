import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import {FC, memo} from 'react';

export interface IPostButtonProps {
  postData: () => void;
}

const PostButton: FC<IPostButtonProps> = ({postData}) => {
  return (
    <Button onClick={postData} variant='outlined' endIcon={<SendIcon />}>
      Send
    </Button>
  );
};

export default memo(PostButton);
