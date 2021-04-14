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
  Cover: SingleMediaType[];
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
