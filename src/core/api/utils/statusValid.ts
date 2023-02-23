const tryCastToNum = (code: string | number) => Number(code) || 500;

export const isOk = (statusCode: number | string) => {
  const code = tryCastToNum(statusCode);
  return (code <= 299 && code >= 200) || code === 304;
};

export const isServerError = (statusCode: number) => {
  return statusCode >= 500;
};

export const isRequestError = (statusCode: number) => {
  return statusCode <= 499 && statusCode >= 400;
};

export const isLoginRequired = (status: number) => {
  return status === 403;
};
