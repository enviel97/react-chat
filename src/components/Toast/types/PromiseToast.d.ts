interface PromiseToastProps<T = any> {
  /**
   * callback function return promise function
   * @returns promise function
   */
  action: () => Promise<T>;
  abortCallback?: () => void;

  pending?: string;
  delayOnSuccess?: number;
  delayOnFailure?: number;

  /**
   * onSuccess when call promise function, get return of callback function if have
   * @returns void
   */
  onSuccess?: (res: T) => void;

  /**
   * onSuccess when call promise function, get return of callback function if have
   * @returns void
   */
  onError?: () => void;

  /**
   * Execute on all case success and error
   * @returns void
   */
  onFinally?: () => void;
}
