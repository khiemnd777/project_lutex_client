import { FieldPolicy, FieldReadFunction } from '@apollo/client';

const CACHE_POLICIES = 'cache_policies';

const getPolicies = <T = any>() => {
  return (
    (window[CACHE_POLICIES] as {
      [fieldName: string]: FieldPolicy<any> | FieldReadFunction<any>;
    }) ||
    (window[CACHE_POLICIES] = {} as {
      [fieldName: string]: FieldPolicy<any> | FieldReadFunction<any>;
    })
  );
};

export class CachePolicy {
  static RegisterFieldPolicy<T = any>(fieldName: string, policy: FieldPolicy<T[]>) {
    const policies = getPolicies();
    if (!policies[fieldName]) {
      policies[fieldName] = policy;
      return this;
    }
    throw new Error('Duplicated field name');
  }
  static GetFieldPolicies(): {
    [fieldName: string]: FieldPolicy<any> | FieldReadFunction<any>;
  } {
    return getPolicies();
  }
}
