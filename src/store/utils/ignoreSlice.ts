export const ignoreSlice = (sliceName: string, ...actions: string[]) => {
  const _actions = actions.map((action) => `${sliceName}/${action}`);
  return [sliceName, ..._actions];
};

export const createThunkAction = (thunk: string) => {
  return ["fulfilled", "pending", "rejected"].map(
    (state) => `${thunk}/${state}`
  );
};
