declare module "axios" {
  interface AxiosRequestConfig {
    pathVariable?: Record<string, string>;
  }
}

export {};
