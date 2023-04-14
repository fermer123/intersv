import {fireEvent, render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import PostButton, {IPostButtonProps} from './PostButton';
import 'jest-styled-components';

describe('postButton', () => {
  const action = jest.fn();
  const customProps: IPostButtonProps = {
    postData: action,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('toMatchSnapshot', () => {
    const tree = renderer.create(<PostButton {...customProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('postButton called', () => {
    render(<PostButton {...customProps} />);
    const linkElement = screen.getByRole('button');
    fireEvent.click(linkElement);
    expect(action).toHaveBeenCalled();
  });
});
