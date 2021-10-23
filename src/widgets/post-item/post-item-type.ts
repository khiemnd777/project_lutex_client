import { SimpleRouterType } from '_stdio/core/router/router-types';
import { SingleMediaType } from '_stdio/shared/types/image-types';

export type PostItemGraphResult = {
  postItems: PostItemType[];
};

export type PostItemType = {
  id: string;
  Slug: string;
  Title: string;
  Short: string;
  Body: string;
  createdAt: string;
  Router: SimpleRouterType;
  Tags: PostTag[];
  Catalog: {
    id: string;
    DisplayName: string;
    Router: SimpleRouterType;
  };
  Cover: SingleMediaType[];
};

export type PostTag = {
  Tag: string;
  Slug: string;
  Router: SimpleRouterType;
};


export type UpdateViewCountGraphResult = {
  updatePostItem: UpdateViewCountType;
};

export type UpdateViewCountType = {
  postItem: {
    id: string;
    ViewCount: number;
  };
};

export type PostItemViewCountGraphResult = {
  postItemViewCountsConnection: {
    aggregate: {
      count: number;
    };
  };
};

export type PostItemLikeGraphResult = {
  postItemLikesConnection: {
    aggregate: {
      count: number;
    };
  };
};

export type CreateViewCountGraphResult = {
  createPostItemViewCount: {
    postItemViewCount: {
      id: number;
    };
  };
};
