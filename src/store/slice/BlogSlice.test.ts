import {setupStore} from '..';
// eslint-disable-next-line import/no-named-as-default
import BlogSlice, {
  IBlogState,
  addNewBlogItem,
  addRaiting,
  fetchSuccess,
  subtractRaiting,
} from './BlogSlice';

const store = setupStore();

describe('BlogSlice', () => {
  const initialState: IBlogState = {
    loading: false,
    error: false,
    posts: [
      {
        id: 1,
        body: '123',
        title: '123',
      },
    ],
    comments: [
      {
        parentId: 1,
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
    expect(result).toEqual({
      loading: false,
      error: false,
      posts: [
        {
          id: 1,
          body: '123',
          title: '123',
        },
      ],
      comments: [
        {
          parentId: 1,
          id: 1,
          comment: 'asd',
          email: 'qwe@mail.ru',
          raiting: -9,
          name: 'qwe',
          date: 12102023,
        },
      ],
    });
  });
  test('addNewBlogItem', () => {
    let state = store.getState().Blog;
    store.dispatch(
      addNewBlogItem({
        parentId: 1,
        id: 2,
        comment: 'test',
        date: 12345,
        name: 'test',
        email: 'test',
        raiting: 0,
      }),
    );
    state = store.getState().Blog;
    const item = state.comments.find((e) => e.id === 2 && e.parentId === 1);
    expect(item.comment).toBe('test');
  });
  test('subtractRaiting', () => {
    const previousState: IBlogState = {
      error: false,
      loading: false,
      posts: [
        {
          id: 1,
          body: '123',
          title: '123',
        },
      ],
      comments: [
        {
          parentId: 1,
          id: 1,
          comment: 'asd',
          email: 'qwe@mail.ru',
          raiting: -9,
          name: 'qwe',
          date: 12102023,
        },
      ],
    };
    expect(
      BlogSlice(previousState, subtractRaiting({id: 1, parentId: 1})),
    ).toEqual({
      error: false,
      loading: false,
      posts: [
        {
          id: 1,
          body: '123',
          title: '123',
        },
      ],
      comments: [
        {
          parentId: 1,
          id: 1,
          comment: 'asd',
          email: 'qwe@mail.ru',
          raiting: -10,
          name: 'qwe',
          date: 12102023,
        },
      ],
    });
  });
  test('addRaiting', () => {
    const previousState: IBlogState = {
      error: false,
      loading: false,
      posts: [
        {
          id: 1,
          body: '123',
          title: '123',
        },
      ],
      comments: [
        {
          parentId: 1,
          id: 1,
          comment: 'asd',
          email: 'qwe@mail.ru',
          raiting: -9,
          name: 'qwe',
          date: 12102023,
        },
      ],
    };
    expect(BlogSlice(previousState, addRaiting({id: 1, parentId: 1}))).toEqual({
      error: false,
      loading: false,
      posts: [
        {
          id: 1,
          body: '123',
          title: '123',
        },
      ],
      comments: [
        {
          parentId: 1,
          id: 1,
          comment: 'asd',
          email: 'qwe@mail.ru',
          raiting: -8,
          name: 'qwe',
          date: 12102023,
        },
      ],
    });
  });
  test('fetch success', () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const initialState: IBlogState = {
      loading: false,
      error: false,
      posts: [],
      comments: [],
    };
    const payload = [{id: 1, title: 'test', body: 'test'}];
    const nextState = BlogSlice(initialState, fetchSuccess(payload));
    expect(nextState.loading).toBe(false);
    expect(nextState.posts).toEqual(payload);
    expect(nextState.error).toBe(false);
  });
});
