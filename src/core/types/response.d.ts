// @ts-ignore
interface Response<T> {
  code: string;
  message?: string;
  data?: T;
}

interface Pagination<T> {
  total: number;
  bucket: number;
  limit: number;
  data?: T[];
}

interface PaginationOption {
  bucket: number;
  limit: number;
}

interface Meta<T> {
  arg: T;
  requestId: string;
  requestStatus: "pending" | "fulfilled" | "idle" | "rejected";
}
interface PayloadThunkAction<Request, Response = any> {
  meta: Meta<Request>;
  payload: Response;
  type: string;
}
