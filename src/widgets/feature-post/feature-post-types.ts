import { SingleMediaType } from '_stdio/shared/types/image-types';

export type FeaturePostGraphResult = {
  postCatalogs: FeaturePostType[];
};

export type FeaturePostType = {
  id: string;
  Name: string;
  DisplayName: string;
  Slug: string;
  Short: string;
  FeaturePosts: FeatureDetailPostType[];
};

export type FeatureDetailPostType = {
  id: string;
  Title: string;
  Post: PostType;
  Router: {
    id: string;
    Path: string;
  };
  Media: SingleMediaType[];
};

export type PostType = {
  id: string;
  Title: string;
  createdAt: Date;
  Slug: string;
  Cover: SingleMediaType[];
};

export type VisualizedPostType = {
  Title: string;
  CreatedAt: Date;
  Url: string;
  Cover?: SingleMediaType;
};
