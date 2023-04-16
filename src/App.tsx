import {Container} from '@mui/material';
import {FC} from 'react';
import styled from 'styled-components';
import Posts from './components/posts/Posts';

const AppContainer = styled(Container)`
  margin: 0 auto;
  max-width: 1230px;
  padding: 0 15px;
`;

const App: FC = () => {
  return (
    <AppContainer>
      <Posts />
    </AppContainer>
  );
};

export default App;
