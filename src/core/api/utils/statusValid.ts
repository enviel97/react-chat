export const isOk = (statusCode: number) => {
  return (statusCode <= 299 && statusCode >= 200) || statusCode === 304;
};

export const isServerError = (statusCode: number) => {
  return statusCode >= 500;
};

export const isRequestError = (statusCode: number) => {
  return statusCode <= 499 && statusCode >= 400;
};
