import { gql, useMutation, useQuery } from '@apollo/client';
import { CreateLikeGraphResult, PostItemLikeGraphResult } from './post-action-types';

export const CreateLike = () => {
  return useMutation<CreateLikeGraphResult>(
    gql`
      mutation createPostItemLike($postId: ID, $key: String) {
        createPostItemLike(input: { data: { Key: $key, Post: $postId } }) {
          postItemLike {
            id
          }
        }
      }
    `
  );
};

export const GraphPostItemLikeCount = (postId: string) => {
  return useQuery<PostItemLikeGraphResult>(
    gql`
      query($id: String) {
        postItemLikesConnection(where: { Post: { id: $id } }) {
          aggregate {
            count
          }
        }
      }
    `,
    {
      variables: {
        id: postId,
      },
      fetchPolicy: 'no-cache',
    }
  );
};

export const GraphPostItemLikeExist = (postId: string, key: string) => {
  return useQuery<PostItemLikeGraphResult>(
    gql`
      query($id: String, $key: String) {
        postItemLikesConnection(where: { Post: { id: $id }, Key: $key }) {
          aggregate {
            count
          }
        }
      }
    `,
    {
      variables: {
        id: postId,
        key,
      },
      fetchPolicy: 'no-cache',
    }
  );
};
