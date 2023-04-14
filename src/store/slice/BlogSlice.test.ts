import {setupStore} from '..';
// eslint-disable-next-line import/no-named-as-default
import BlogSlice, {IBlogState, addNewBlogItem, addRaiting} from './BlogSlice';

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
        comments: [
          {
            id: 1,
            comment: 'asd',
            email: 'qwe@mail.ru',
            raiting: -9,
            name: 'qwe',
            date: 12102023,
          },
        ],
      },
    ],
  };

  test('BlogSlice', () => {
    const result = BlogSlice(initialState, {type: ''});
    expect(result.posts).toEqual([
      {
        id: 1,
        body: '123',
        title: '123',
        comments: [
          {
            id: 1,
            comment: 'asd',
            email: 'qwe@mail.ru',
            raiting: -9,
            name: 'qwe',
            date: 12102023,
          },
        ],
      },
    ]);
  });
  test('addNewBlogItem', () => {
    let state = store.getState().Blog;
    store.dispatch(
      addNewBlogItem({
        id: 1,
        comment: {
          id: 2,
          comment: 'test',
          date: 12345,
          name: 'test',
          email: 'test',
          raiting: 0,
        },
      }),
    );
    state = store.getState().Blog;
    const newItem = state.posts?.find((e) => e.id === 1);
    const newItemAfterPost = newItem?.comments.find((e) => e.id === 2);
    expect(newItemAfterPost.comment).toBe('test');
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
          comments: [
            {
              id: 1,
              comment: 'asd',
              email: 'qwe@mail.ru',
              raiting: -9,
              name: 'qwe',
              date: 12102023,
            },
          ],
        },
      ],
    };
    expect(BlogSlice(previousState, addRaiting({id: 1, ParentId: 1}))).toEqual({
      error: false,
      loading: false,
      posts: [
        {
          id: 1,
          body: '123',
          title: '123',
          comments: [
            {
              id: 1,
              comment: 'asd',
              email: 'qwe@mail.ru',
              raiting: -8,
              name: 'qwe',
              date: 12102023,
            },
          ],
        },
      ],
    });
  });
});
