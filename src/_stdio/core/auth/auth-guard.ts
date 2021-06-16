import { AuthMe } from './auth-service';

export const AuthGuard = async () => {
  try {
    await AuthMe();
    return true;
  } catch (exc) {
    return false;
  }
};
