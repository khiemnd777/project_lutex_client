import { CachePolicy } from '_stdio/core/cache-policy/cache-policy';
import { startLimitPagination } from '_stdio/core/cache-policy/cache-policy.utils';

CachePolicy.RegisterFieldPolicy('postCatalogs', startLimitPagination());
CachePolicy.RegisterFieldPolicy(
  'postItems',
  startLimitPagination(['where', ['Catalog', ['id', 'Slug']], 'start', 'limit'])
);
CachePolicy.RegisterFieldPolicy('featuredPosts', startLimitPagination(['where', ['id', 'Name']]));
CachePolicy.RegisterFieldPolicy('featuredCatalogs', startLimitPagination(['where', ['id', 'Name']]));
