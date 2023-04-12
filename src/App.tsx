import {Container} from '@mui/material';
import {FC} from 'react';
import styled from 'styled-components';

const Cheks = styled(Container)`
  margin: 0 auto;
  max-width: 1230px;
  padding: 0 15px;
`;

const App: FC = () => {
  return <Cheks>app</Cheks>;
};

export default App;
