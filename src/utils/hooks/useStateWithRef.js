import { useRef, useState } from 'react';

function useStateWithRef(initial) {
  const [value, setValue] = useState(initial);
  const ref = useRef(initial);
  ref.current = value;
  return [value, setValue, ref];
}

export default useStateWithRef;
