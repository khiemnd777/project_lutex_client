import { SimpleRouterType } from '_stdio/core/router/router-types';
import { SingleMediaType } from '_stdio/shared/types/image-types';

export type AvailablePostItemsGraphResult = {
  postItemsConnection: {
    aggregate: {
      totalCount: number;
    };
  };
  postItems: PostItemType[];
};

export type DefailtPostItemGraphResult = {
  postItem: DetailPostItemType;
};

export type PostItemType = {
  id: string;
  Slug: string;
  Title: string;
  Short: string;
  PostOn: Date;
  PostOff: Date;
  createdAt: Date;
  Catalog?: PostCatalogType;
  Router: SimpleRouterType;
  Cover: SingleMediaType[];
};

export type DetailPostItemType = {
  id: string;
  Slug: string;
  Title: string;
  Short: string;
  Body: string;
  PostOn: Date;
  PostOff: Date;
  createdAt: Date;
  Related_Items: {
    id: string;
  }[];
  Catalog: PostCatalogType;
  Router: SimpleRouterType;
  Cover: SingleMediaType[];
  Media: SingleMediaType[];
};

export type PostCatalogType = {
  id: string;
  DisplayName: string;
  Slug: string;
  Router: SimpleRouterType;
};
