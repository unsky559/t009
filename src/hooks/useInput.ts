import { useEffect, useState } from 'react';

export default function useInput() {
  const [value, updateValue] = useState('');
  const [isValid, updateValid] = useState(true);
  const [helperText, updateHelperText] = useState('');

  useEffect(() => {
    updateValid(true);
    updateHelperText('');
  }, [value]);

  return {
    updateValid,
    updateValue,
    updateHelperText,
    isValid,
    value,
    helperText
  };
}
