import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import {Provider} from 'react-redux';
import {setupStore} from '@src/store';
import Header from './Header';

const store = setupStore();
describe('Header', () => {
  test('toMatchSnapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Header parentId={1} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('renders Header component', () => {
    render(
      <Provider store={store}>
        <Header parentId={1} />
      </Provider>,
    );
    expect(screen.getByLabelText('Введите имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Введите email')).toBeInTheDocument();
    expect(screen.getByLabelText('Введите комментарий')).toBeInTheDocument();
    expect(screen.getByTestId('postData')).toBeInTheDocument();
  });
  test('disabled submitButton', async () => {
    render(
      <Provider store={store}>
        <Header parentId={1} />
      </Provider>,
    );
    const name = screen.getByLabelText(/введите имя/i);
    const comment = screen.getByLabelText(/введите комментарий/i);
    const email = screen.getByLabelText(/введите email/i);
    const submitButton = screen.getByTestId('postData');
    await userEvent.type(name, '  ');
    await userEvent.type(email, 'invalid-email');
    await userEvent.type(comment, 'short');
    await waitFor(() => expect(submitButton).toBeDisabled());
  });
  test('enable submitButton', async () => {
    render(
      <Provider store={store}>
        <Header parentId={1} />
      </Provider>,
    );
    const name = screen.getByLabelText(/введите имя/i);
    const comment = screen.getByLabelText(/введите комментарий/i);
    const email = screen.getByLabelText(/введите email/i);
    const submitButton = screen.getByTestId('postData');
    await userEvent.type(name, 'test');
    await userEvent.type(email, 'test@mail.ru');
    await userEvent.type(comment, 'test');
    await waitFor(() => expect(submitButton).toBeEnabled());
  });
});
