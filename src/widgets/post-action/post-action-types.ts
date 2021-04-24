export type CreateLikeGraphResult = {
  createPostItemLikeCount: {
    postItemLikeCount: {
      id: number;
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
