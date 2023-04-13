import {Container} from '@mui/material';
import {FC} from 'react';
import styled from 'styled-components';
import Blog from './components/blog/Blog';
import Header from './components/head/Header';

const AppContainer = styled(Container)`
  margin: 0 auto;
  max-width: 1230px;
  padding: 0 15px;
`;

const App: FC = () => {
  return (
    <AppContainer>
      <Header />
      <Blog />
    </AppContainer>
  );
};

export default App;
