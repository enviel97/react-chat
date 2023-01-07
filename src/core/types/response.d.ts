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
