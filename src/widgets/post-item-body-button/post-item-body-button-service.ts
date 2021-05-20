import { gql, useQuery } from '@apollo/client';
import { PostItemBodyGraphResult } from './post-item-body-button-types';

export const GraphPostItemBody = (id: string) =>
  useQuery<PostItemBodyGraphResult>(
    gql`
      query postItemBody($id: ID!) {
        postItem(id: $id) {
          id
          Body
        }
      }
    `,
    {
      variables: {
        id,
      },
    }
  );
