import {fireEvent, render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';

import 'jest-styled-components';
import PostButton, {IPostButtonProps} from './PostButton';

describe('postButton', () => {
  const action = jest.fn();
  const customProps: IPostButtonProps = {
    onSubmit: action,
    disabled: true,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('toMatchSnapshot', () => {
    const tree = renderer.create(<PostButton {...customProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('postButton not called', () => {
    render(<PostButton {...customProps} />);
    const linkElement = screen.getByRole('button');
    fireEvent.click(linkElement);
    expect(action).not.toHaveBeenCalled();
  });
  test('postButton called', () => {
    render(<PostButton onSubmit={action} disabled={false} />);
    const linkElement = screen.getByRole('button');
    fireEvent.click(linkElement);
    expect(action).toHaveBeenCalled();
  });
});
