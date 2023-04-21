import {render, screen} from '@testing-library/react';
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
  test('validate', async () => {
    render(
      <Provider store={store}>
        <Header parentId={1} />
      </Provider>,
    );
    const name = screen.getByLabelText('Введите имя');
    const comment = screen.getByLabelText('Введите комментарий');
    const email = screen.getByLabelText('Введите e-mail');

    expect(screen.getAllByText(/поле не должно быть пустым/i)).toHaveLength(2);
    await userEvent.type(name, 'test');
    expect(screen.queryAllByText(/поле не должно быть пустым/i)).toHaveLength(
      1,
    );
    await userEvent.type(comment, 'test');
    expect(screen.queryAllByText(/поле не должно быть пустым/i)).toHaveLength(
      0,
    );

    expect(
      screen.getByText(/неверный E-mail или пустое значение/i),
    ).toBeInTheDocument();
    await userEvent.type(email, 'test@mail.ru');
    expect(
      screen.queryByText(/неверный E-mail или пустое значение/i),
    ).not.toBeInTheDocument();
  });
});
