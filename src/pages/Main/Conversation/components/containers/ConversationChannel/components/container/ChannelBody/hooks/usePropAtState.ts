import { useCallback, useEffect, useState } from "react";

const usePropAsState = <P = any, Trans = any>(
  prop: P,
  transform: (prop: P) => Trans
) => {
  const [state, setState] = useState<Trans>();
  const callback = useCallback(() => {
    setState(transform(prop));
  }, [prop, transform]);

  useEffect(callback, [prop]);

  return [state, setState];
};

export default usePropAsState;
