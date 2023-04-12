import {ChangeEvent, useState, useCallback} from 'react';

type IchangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
const useInput = (initialValie = '') => {
  const [value, setValue] = useState<string>(initialValie);
  const changeHandler: IchangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );
  return {
    setValue,
    value,
    onChange: changeHandler,
  };
};
export default useInput;
