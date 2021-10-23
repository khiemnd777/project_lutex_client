import { gql, useQuery } from '@apollo/client';
import { RelatedPostItemsListGraphResult } from './related-post-items-list-types';

export const GraphRelatedPostItemsList = (
  postId: string,
  datetimeNow: string,
  limit: number,
  publicationState: 'LIVE' | 'PREVIEW'
) =>
  useQuery<RelatedPostItemsListGraphResult>(
    gql`
      query ${publicationState === 'PREVIEW' ? `_noCache` : `relatedPostItemsList`}($postId: ID!, $limit:Int) {
        postItem(publicationState:${publicationState}, id: $postId) {
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
