import { gql, useMutation, useQuery } from '@apollo/client';
import { CreateLikeGraphResult, DeleteLikeGraphResult, PostItemLikeGraphResult } from './post-action-types';

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

export const DeleteLike = () => {
  return useMutation<DeleteLikeGraphResult>(
    gql`
      mutation deletePostLike($id: ID!) {
        deletePostItemLike(input: { where: { id: $id } }) {
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
      query($postId: String) {
        postItemLikesConnection(where: { Post: { id: $postId } }) {
          aggregate {
            count
          }
        }
      }
    `,
    {
      variables: {
        postId,
      },
      fetchPolicy: 'no-cache',
    }
  );
};

export const GraphPostItemLikeExist = (postId: string, key: string) => {
  return useQuery<PostItemLikeGraphResult>(
    gql`
      query($postId: String, $key: String) {
        postItemLikesConnection(where: { Post: { id: $postId }, Key: $key }) {
          aggregate {
            count
          }
          values {
            id
          }
        }
      }
    `,
    {
      variables: {
        postId,
        key,
      },
      fetchPolicy: 'no-cache',
    }
  );
};
