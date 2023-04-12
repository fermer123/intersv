import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import GlobalStyle from './global';
import {setupStore} from './store';

const store = setupStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
);
