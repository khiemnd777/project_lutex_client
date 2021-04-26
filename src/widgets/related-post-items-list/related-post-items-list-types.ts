import { SimpleRouterType } from '_stdio/core/router/router-types';

export type RelatedPostItemsListGraphResult = {
  postItem: {
    id: string;
    Related_Items: RelatedPostItemType[];
  };
};

export type RelatedPostItemType = {
  Title: string;
  Slug: string;
  Router: SimpleRouterType;
};
