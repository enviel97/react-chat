import { State } from "@store/common/state";

export const notEmpty = <TValue>(
  value: TValue | null | undefined
): value is TValue => {
  if (value === null || value === undefined || value.toString().trim() === "")
    return false;
  // const testDummy: TValue = value;
  return true;
};

export const isIdle = (status: number) => {
  return status === State.IDLE;
};

export const isLoading = (status: number) => {
  return status === State.PENDING;
};

export const isError = (status: number) => {
  return status === State.ERROR;
};

export const isCharacterKeyCode = (keyCode?: number) => {
  const code = keyCode ?? -1;
  return (
    (code >= 48 && code <= 90) ||
    (code >= 96 && code <= 111) ||
    (code >= 186 && code <= 222)
  );
};
