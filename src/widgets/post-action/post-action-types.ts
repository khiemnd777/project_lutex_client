export type CreateLikeGraphResult = {
  createPostItemLikeCount: {
    postItemLikeCount: {
      id: number;
    };
  };
};

export type PostItemLikeGraphResult = {
  postItemLikeCountsConnection: {
    aggregate: {
      count: number;
    };
  };
};
