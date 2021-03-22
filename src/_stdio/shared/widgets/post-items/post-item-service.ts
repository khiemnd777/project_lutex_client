import { gql, useQuery } from '@apollo/client';
import { ImageGraphProps } from '_stdio/shared/constants/image-constants';
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
  Catalogs{
    id
  }
  Related_Items{
    id
  }
  Slider{
    ${ImageGraphProps}
  }
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
