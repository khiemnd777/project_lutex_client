import { gql, useMutation, useQuery } from '@apollo/client';
import { PostItemGraphResult, UpdateViewCountGraphResult } from './post-item-type';

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
