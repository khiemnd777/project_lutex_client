import { useEffect, useState } from 'preact/hooks';
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

export const useAuthGuard = () => {
  let [hasLoggedIn, setHasLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    AuthGuard().then((loggedIn) => {
      setHasLoggedIn(loggedIn);
    });
  }, [hasLoggedIn]);
  return hasLoggedIn;
};
