import { gql, useMutation, useQuery } from '@apollo/client';
import {
  CreateViewCountGraphResult,
  PostItemGraphResult,
  PostItemLikeGraphResult,
  PostItemViewCountGraphResult,
  UpdateViewCountGraphResult,
} from './post-item-type';

export const GraphPostItemBySlug = (slug: string) => {
  return useQuery<PostItemGraphResult>(
    gql`
      query($slug: String!) {
        postItems(where: { Slug: $slug }) {
          id
          Slug
          Title
          Short
          Body
          Cover {
            id
            Caption
            Media {
              formats
            }
          }
        }
      }
    `,
    {
      variables: {
        slug,
      },
    }
  );
};

export const UpdateViewCount = (id: string) => {
  return useMutation<UpdateViewCountGraphResult>(
    gql`
      mutation($id: String!) {
        updatePostItem(input: { where: { id: $id }, data: { ViewCount: 0 } }) {
          postItem {
            id
            Title
            ViewCount
          }
        }
      }
    `,
    {
      variables: {
        id,
      },
    }
  );
};

export const CreateViewCount = (postId: string, ipv6: string) => {
  return useMutation<CreateViewCountGraphResult>(
    gql`
      mutation createPostViewCount($postId: ID, $ipv6: String) {
        createPostItemViewCount(input: { data: { Ipv6: $ipv6, Post: $postId } }) {
          postItemViewCount {
            id
          }
        }
      }
    `,
    {
      variables: {
        postId,
        ipv6,
      },
    }
  );
};

export const GraphPostItemViewCount = (slug: string) => {
  return useQuery<PostItemViewCountGraphResult>(
    gql`
      query($slug: String) {
        postItemViewCountsConnection(where: { Post: { Slug: $slug } }) {
          aggregate {
            count
          }
        }
      }
    `,
    {
      variables: {
        slug,
      },
    }
  );
};

export const GraphPostItemLike = (slug: string) => {
  return useQuery<PostItemLikeGraphResult>(
    gql`
      query($slug: String) {
        postItemLikesConnection(where: { Post: { Slug: $slug } }) {
          aggregate {
            count
          }
        }
      }
    `,
    {
      variables: {
        slug,
      },
    }
  );
};
