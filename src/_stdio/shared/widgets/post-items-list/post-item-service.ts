import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
import { AvailablePostItemsGraphResult, DetailPostItemType } from './post-item-types';

const postItemProps = `
  id
  Title
  Short
  PostOn
  PostOff
  Cover{
    ${MediaGraphProps}
  }
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
  Media{
    ${MediaGraphProps}
  }
`;

const availablePostItemCondition = (datetimeNow: Date) => `
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
`;

export const GraphAvailablePostItems = (datetimeNow: Date, start: number, limit: number) => {
  return useQuery<AvailablePostItemsGraphResult>(gql`
    query {
      postItems (
        where: {
          ${availablePostItemCondition(datetimeNow)}
        }
        sort:"createdAt:desc"
        start: ${start}
        limit: ${limit}
      ) {
        ${postItemProps}
      }
    }
  `);
};

export const GraphPostItemInCatalog = (catalogId: string, datetimeNow: Date, start: number, limit: number) => {
  return useQuery<AvailablePostItemsGraphResult>(gql`
    query {
      postItems (
        where: {
          Catalogs: {
            id:"${catalogId}"
          }
          ${availablePostItemCondition(datetimeNow)}
        }
        sort:"createdAt:desc"
        start: ${start}
        limit: ${limit}
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
