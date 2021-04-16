import { replaceByKeyPairValue } from '_stdio/shared/utils/string.utils';

export const buildRouterPath = <T = any>(routerPath: string, item: T) => {
  const path = replaceByKeyPairValue(routerPath, item);
  return path;
};
