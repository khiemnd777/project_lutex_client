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
};

export type DetailPostItemType = {
  id: string;
  Title: string;
  Short: string;
  Body: string;
  PostOn: Date;
  PostOff: Date;
};
