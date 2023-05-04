import {Provider} from 'react-redux';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import {setupStore} from '@src/store';
import Blog from './Blog';

const store = setupStore();
describe('Blog', () => {
  test('toMatchSnapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Blog parentId={1} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
