import { TypePolicies } from '@apollo/client';
import { CachePolicy } from '_stdio/core/cache-policy/cache-policy';

export const typePoliciesConfig = () => {
  return {
    Query: {
      fields: CachePolicy.GetFieldPolicies(),
    },
  } as TypePolicies;
};
