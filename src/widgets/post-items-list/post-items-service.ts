import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
import { AvailablePostItemsGraphResult, DetailPostItemType } from './post-item-types';

const postItemProps = `
  id
  Slug
  Title
  Short
  PostOn
  PostOff
  createdAt
  Router {
    id
    Path
  }
  Catalog{
    id
    DisplayName
    Slug
  }
  Cover{
    ${MediaGraphProps}
  }
`;

const detailPostItemProps = `
  ${postItemProps}
  Body
  Related_Items{
    id
  }
  Media{
    ${MediaGraphProps}
  }
`;

const postItemsConnection = `
  postItemsConnection{
    aggregate{
      totalCount
    }
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

export const GraphAvailablePostItems = (datetimeNow: Date, start: number, limit: number, sort = 'createdAt:desc') => {
  return useQuery<AvailablePostItemsGraphResult>(
    gql`
    query ($start:Int, $limit:Int, $sort: String) {
      ${postItemsConnection}
      postItems (
        where: {
          ${availablePostItemCondition(datetimeNow)}
        }
        sort: $sort
        start: $start
        limit: $limit
      ) {
        ${postItemProps}
      }
    }
  `,
    {
      variables: {
        start,
        limit,
        sort,
      },
    }
  );
};

export const GraphPostItemInCatalog = (slug: string, datetimeNow: Date, start: number, limit: number) => {
  return useQuery<AvailablePostItemsGraphResult>(
    gql`
    query ($slug:String, $start:Int, $limit:Int) {
      ${postItemsConnection}
      postItems (
        where: {
          Catalog: {
            Slug: $slug
          }
          ${availablePostItemCondition(datetimeNow)}
        }
        sort:"createdAt:desc"
        start: $start
        limit: $limit
      ) {
        ${postItemProps}
      }
    }
  `,
    {
      variables: {
        slug,
        start,
        limit,
      },
      nextFetchPolicy: 'cache-first',
      fetchPolicy: 'cache-first',
    }
  );
};

export const GraphPostItemInCatalogId = (catalogId: string, datetimeNow: Date, start: number, limit: number) => {
  return useQuery<AvailablePostItemsGraphResult>(
    gql`
    query ($catalogId:String, $start:Int, $limit:Int) {
      ${postItemsConnection}
      postItems (
        where: {
          Catalog: {
            id: $catalogId
          }
          ${availablePostItemCondition(datetimeNow)}
        }
        sort:"createdAt:desc"
        start: $start
        limit: $limit
      ) {
        ${postItemProps}
      }
    }
  `,
    {
      variables: {
        catalogId,
        start,
        limit,
      },
      nextFetchPolicy: 'cache-first',
      fetchPolicy: 'cache-first',
    }
  );
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
