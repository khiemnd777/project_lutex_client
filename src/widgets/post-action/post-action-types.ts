export type CreateLikeGraphResult = {
  createPostItemLike: {
    postItemLike: {
      id: number;
    };
  };
};

export type DeleteLikeGraphResult = {
  deletePostItemLike: {
    postItemLike: {
      id: number;
    };
  };
};

export type PostItemLikeGraphResult = {
  postItemLikesConnection: {
    aggregate: {
      count: number;
    };
    values: { id: string }[];
  };
};
