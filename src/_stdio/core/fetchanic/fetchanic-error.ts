export const isFetchanicError = (err: Error) => {
  return err instanceof FetchanicError;
};

export declare class FetchanicError extends Error {}
