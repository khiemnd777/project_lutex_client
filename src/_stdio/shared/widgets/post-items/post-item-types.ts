import { MediaType } from '../../types/image-types';

export type AvailablePostItemsGraphResult = {
  postItems: PostItemType[];
};

export type DefailtPostItemGraphResult = {
  postItem: DetailPostItemType;
};

export type PostItemType = {
  id: string;
  Title: string;
  Short: string;
  PostOn: Date;
  PostOff: Date;
  Cover: MediaType[];
};

export type DetailPostItemType = {
  id: string;
  Title: string;
  Short: string;
  Body: string;
  PostOn: Date;
  PostOff: Date;
  Related_Items: {
    id: string;
  }[];
  Catalogs: {
    id: string;
  }[];
  Cover: MediaType[];
  Media: MediaType[];
};
