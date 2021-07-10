import { CachePolicy } from '_stdio/core/cache-policy/cache-policy';
import { defaultPolicy, startLimitPagination } from '_stdio/core/cache-policy/cache-policy.utils';

CachePolicy.RegisterFieldPolicy('postCatalogs', defaultPolicy(['where', ['Slug']]));
CachePolicy.RegisterFieldPolicy(
  'postItems',
  startLimitPagination(['where', ['Catalog', ['id', 'Slug']], 'start', 'limit'])
);
CachePolicy.RegisterFieldPolicy('featuredPosts', defaultPolicy(['where', ['id', 'Name']]));
CachePolicy.RegisterFieldPolicy('featuredCatalogs', defaultPolicy(['where', ['id', 'Name']]));
CachePolicy.RegisterFieldPolicy('pictureFields', defaultPolicy(['where', ['Name']]));
