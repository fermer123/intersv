import {setupStore} from '..';
// eslint-disable-next-line import/no-named-as-default
import BlogSlice, {
  IBlogState,
  addNewBlogItem,
  addRaiting,
  subtractRaiting,
} from './BlogSlice';

const store = setupStore();

describe('BlogSlice', () => {
  const initialState: IBlogState = {
    blog: [
      {
        id: 1,
        comment: 'asd',
        email: 'qwe@mail.ru',
        raiting: -9,
        name: 'qwe',
        date: 12102023,
      },
    ],
  };

  test('BlogSlice', () => {
    const result = BlogSlice(initialState, {type: ''});
    expect(result.blog).toEqual([
      {
        id: 1,
        comment: 'asd',
        email: 'qwe@mail.ru',
        raiting: -9,
        name: 'qwe',
        date: 12102023,
      },
    ]);
  });

  test('addNewBlogItem', () => {
    let state = store.getState().Blog;
    store.dispatch(
      addNewBlogItem({
        id: 2,
        comment: 'test',
        date: 12345,
        name: 'test',
        email: 'test',
        raiting: 0,
      }),
    );
    state = store.getState().Blog;
    const newItem = state.blog.find((e) => e.id === 2);
    expect(newItem?.comment).toBe('test');
  });
  test('subtractRaiting', () => {
    let state = store.getState().Blog;
    const beforeDispatch = state.blog.find((e) => e.id === 1);
    expect(beforeDispatch?.raiting).toBe(-9);
    store.dispatch(subtractRaiting(1));
    state = store.getState().Blog;
    const afterDispatch = state.blog.find((e) => e.id === 1);
    expect(afterDispatch?.raiting).toBe(-10);
  });
});
