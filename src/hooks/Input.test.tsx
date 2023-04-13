import {renderHook, screen, render, fireEvent} from '@testing-library/react';
import useInput from './Input';

describe('useinput', () => {
  test('value', () => {
    const {result} = renderHook(() => useInput());
    expect(result.current.value).toBe('');
    expect(result.current.onChange).toBeInstanceOf(Function);
  });
  test('onChange', () => {
    const TestComponent = () => {
      const input = useInput();
      return (
        <div>
          <input
            data-testid='test-input'
            type='text'
            value={input.value}
            onChange={input.onChange}
          />
          <p data-testId='test-value'>{input.value}</p>
        </div>
      );
    };
    render(<TestComponent />);
    const inputElement = screen.getByTestId('test-input');
    const valueElement = screen.getByTestId('test-value');
    expect(valueElement.textContent).toBe('');
    fireEvent.change(inputElement, {target: {value: 'testing input'}});
    expect(valueElement.textContent).toBe('testing input');
  });
});
