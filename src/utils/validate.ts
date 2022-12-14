import { State } from "@store/common/state";

export const notEmpty = <TValue>(
  value: TValue | null | undefined
): value is TValue => {
  if (value === null || value === undefined || value.toString().trim() === "")
    return false;
  // const testDummy: TValue = value;
  return true;
};

export const isLoading = (status: number) => {
  return status === State.PENDING;
};
