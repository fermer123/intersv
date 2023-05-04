import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import {Provider} from 'react-redux';
import {setupStore} from '@src/store';
import BlogSlice, {
  IBlogState,
  fetchData,
  fetchSuccess,
} from '@src/store/slice/BlogSlice';
import Posts from './Posts';

const store = setupStore();
describe('Posts', () => {
  test('toMatchSnapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Posts />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('to be in the document', () => {
    const initialState: IBlogState = {
      loading: false,
      error: false,
      posts: [],
      comments: [],
    };
    render(
      <Provider store={store}>
        <Posts />
      </Provider>,
    );
    const payload = [{id: 1, title: 'test', body: 'test'}];
    const linkElement = screen.queryByTestId('postItem');
    expect(linkElement).not.toBeInTheDocument();
    const fetching = BlogSlice(initialState, fetchData());
    expect(fetching.loading).toBeTruthy();
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText(/loading/i)).toBeInTheDocument();
    const fetchingSucces = BlogSlice(initialState, fetchSuccess(payload));
    expect(fetchingSucces.loading).toBeFalsy();
  });
});
