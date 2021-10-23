import { gql, useMutation, useQuery } from '@apollo/client';
import { PublicationState } from '_stdio/shared/utils/types';
import {
  CreateViewCountGraphResult,
  PostItemGraphResult,
  PostItemLikeGraphResult,
  PostItemViewCountGraphResult,
} from './post-item-type';

export const GraphPostItemBySlug = (slug: string, publicationState: 'LIVE' | 'PREVIEW') => {
  return useQuery<PostItemGraphResult>(
    gql`
      query ${publicationState === 'PREVIEW' ? `_noCache` : ''} ($slug: String!) {
        postItems(publicationState:${publicationState}, where: { Slug: $slug }) {
          id
          Slug
          Title
          Short
          Body
          Tags {
            Tag
            Slug
            Router {
              Path
            }
          }
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
      query ($slug: String) {
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
      query ($slug: String) {
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
