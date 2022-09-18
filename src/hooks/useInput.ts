import { useEffect, useState } from 'react';

export default function useInput() {
  const [value, updateValue] = useState('');
  const [isValid, updateValid] = useState(true);

  useEffect(() => {
    updateValid(true);
  }, [value]);

  return {
    updateValid,
    updateValue,
    isValid,
    value,
  };
}
