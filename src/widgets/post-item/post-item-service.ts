import { gql, useMutation, useQuery } from '@apollo/client';
import { useOnceAction } from '_stdio/shared/utils/hooks';
import {
  CreateViewCountGraphResult,
  PostItemGraphResult,
  PostItemLikeGraphResult,
  PostItemViewCountGraphResult,
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
          createdAt
          Router {
            id
            Path
          }
          Catalog {
            id
            DisplayName
            Router {
              id
              Path
            }
          }
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
      fetchPolicy: 'no-cache',
    }
  );
};

export const CreateViewCount = () => {
  return useMutation<CreateViewCountGraphResult>(
    gql`
      mutation createPostViewCount($postId: ID, $key: String) {
        createPostItemViewCount(input: { data: { Key: $key, Post: $postId } }) {
          postItemViewCount {
            id
          }
        }
      }
    `
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
