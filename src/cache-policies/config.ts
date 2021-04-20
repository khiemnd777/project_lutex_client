import { CachePolicy } from '_stdio/core/cache-policy/cache-policy';
import { startLimitPagination } from '_stdio/core/cache-policy/cache-policy.utils';

CachePolicy.RegisterFieldPolicy('postCatalogs', startLimitPagination());
CachePolicy.RegisterFieldPolicy('postItems', startLimitPagination(['where', ['Catalog', ['Slug']]]));
