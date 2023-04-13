import {Container} from '@mui/material';
import {FC} from 'react';
import styled from 'styled-components';
import BlogItems from './components/blog/Blog';
import Header from './components/header/header';

const AppContainer = styled(Container)`
  margin: 0 auto;
  max-width: 1230px;
  padding: 0 15px;
`;

const App: FC = () => {
  return (
    <AppContainer>
      <Header />
      <BlogItems />
    </AppContainer>
  );
};

export default App;
