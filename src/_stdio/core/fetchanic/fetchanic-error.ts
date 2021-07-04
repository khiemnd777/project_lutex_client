export const isFetchanicError = (err: Error) => {
  return err instanceof FetchanicError;
};

export class FetchanicError extends Error {}
