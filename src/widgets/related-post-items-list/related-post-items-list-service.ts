import { gql, useQuery } from '@apollo/client';
import { RelatedPostItemsListGraphResult } from './related-post-items-list-types';

export const GraphRelatedPostItemsList = (postId: string, datetimeNow: Date, limit: number) =>
  useQuery<RelatedPostItemsListGraphResult>(
    gql`
      query relatedPostItemsList($postId: ID!, $limit:Int) {
        postItem(id: $postId) {
          id
          Related_Items(
            where: {
              _or: [
                { PostOn_null: true },
                {
                  PostOn_lte: "${datetimeNow}"
                  _or: [
                    { PostOff_null: true }, 
                    { PostOff_gte: "${datetimeNow}" }
                  ]
                }
              ]
            }
            sort:"createdAt:desc"
            limit: $limit
          ) {
            Title
            Slug
            Router {
              id
              Path
            }
          }
        }
      }
    `,
    {
      variables: {
        postId,
        limit,
      },
    }
  );
