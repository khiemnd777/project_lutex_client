import { RouterType } from '_stdio/core/router/router-types';
import { SingleMediaType } from '_stdio/shared/types/image-types';

export type FeaturedPostGraphResult = {
  featuredPosts: FeaturedPostType[];
};

export type FeaturedPostType = {
  id: string;
  Name: string;
  FeaturedPosts: FeaturedDetailPostType[];
};

export type FeaturedDetailPostType = {
  id: string;
  Title: string;
  Post: PostType;
  Router: RouterType;
  Media: SingleMediaType[];
};

export type PostType = {
  id: string;
  Title: string;
  Short: string;
  Rate: number;
  createdAt: Date;
  Slug: string;
  Router: RouterType;
  Catalog: {
    DisplayName: string;
    Router: RouterType;
    Slug: string;
  };
  Cover: SingleMediaType[];
};

export type VisualizedPostType = {
  Title: string;
  Short: string;
  Rate?: number;
  Url: string;
  CreatedAt: Date;
  Cover: SingleMediaType;
  CatalogName: string;
  CatalogUrl: string;
  ShowTitle: boolean;
};
