import { gql, useQuery } from '@apollo/client';
import { AvailablePostItemsGraphResult, DetailPostItemType } from './post-item-types';

const postItemProps = `
  id
  Title
  Short
  PostOn
  PostOff
`;

const detailPostItemProps = `
  ${postItemProps}
  Body
`;

export const GraphAvailablePostItems = (datetimeNow: Date) => {
  return useQuery<AvailablePostItemsGraphResult>(gql`
    query {
      postItems (
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
      ) {
        ${postItemProps}
      }
    }
  `);
};

export const GraphDetailPostItem = (postItemId: string) => {
  return useQuery<DetailPostItemType>(gql`
    query {
      postItem(id: "${postItemId}") {
        ${detailPostItemProps}
      }
    }
  `);
};
