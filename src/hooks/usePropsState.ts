import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
type UseState<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>];
const usePropsState = <T>(dependence?: T) => {
  const [state, setState] = useState(dependence);

  useEffect(() => {
    setState(dependence);
  }, [dependence]);

  const mapping: UseState<T> = useMemo(() => [state, setState], [state]);
  return mapping;
};

export default usePropsState;
