import { isError } from "@utils/validate";

export const mappingResponse = <T = any>(res: Response<T>) => {
  if (!res) throw new Error("Interval error");
  if (isError(res.status)) throw new Error(res.message ?? "Bad request");
  return res;
};
