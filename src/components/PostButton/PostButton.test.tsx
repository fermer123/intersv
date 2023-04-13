import {render, screen} from '@testing-library/react';
import PostButton, {IPostButtonProps} from './PostButton';

describe('postButton', () => {
  const action = jest.fn();
  const customProps: IPostButtonProps = {
    postData: action,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('toMatchSnapshot', () => {
    render(<PostButton {...customProps} />);
    const linkElement = screen.getByRole('button');
    expect(linkElement).toMatchSnapshot();
  });
  test('postButton called', () => {});
});
