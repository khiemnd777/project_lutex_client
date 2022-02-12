import { useEffect } from 'preact/hooks';
import { AuthLogout, AuthMe } from './auth-service';

export const AuthGuard = async () => {
  try {
    await AuthMe();
    return true;
  } catch (exc) {
    await AuthLogout();
    return false;
  }
};

export const useAuthGuard = (handler: (isAuth: boolean) => void, errorHandler?: (exc: any) => void) => {
  useEffect(() => {
    AuthGuard()
      .then((isAuth) => {
        handler(isAuth);
      })
      .catch((exc) => {
        errorHandler && errorHandler(exc);
      });
  }, []);
};
