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
    Router {
      id
      Path
    }
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

const postItemsConnection = (where?: string) => `
  postItemsConnection ${where ? `(where:${where})` : ''}{
    aggregate{
      totalCount
      count
    }
  }
`;

const availablePostItemCondition = () => `
  _or: [
    { PostOn_null: true },
    {
      PostOn_lte: $datetimeNow
      _or: [
        { PostOff_null: true }, 
        { PostOff_gte: $datetimeNow }
      ]
    }
  ]
`;

export const GraphAvailablePostItems = (
  datetimeNow: string,
  start: number,
  limit: number,
  sort = 'createdAt:desc',
  notContainsCatalogs: string = ''
) => {
  const where = `
  {
    Slug_null: false
    published_at_null: false
    Catalog: {
      ${notContainsCatalogs}
    }
    ${availablePostItemCondition()}
  }`;
  return useQuery<AvailablePostItemsGraphResult>(
    gql`
    query ($datetimeNow:Date, $start:Int, $limit:Int, $sort: String) {
      postItems (
        where: ${where}
        sort: $sort
        start: $start
        limit: $limit
      ) {
        ${postItemProps}
      }
      ${postItemsConnection(where)}
    }
  `,
    {
      variables: {
        datetimeNow,
        start,
        limit,
        sort,
      },
      nextFetchPolicy: 'cache-first',
      fetchPolicy: 'cache-first',
    }
  );
};

export const GraphPostItemInCatalog = (
  slug: string,
  datetimeNow: string,
  start: number,
  limit: number,
  useDisplayOrder = false,
  seqDisplayOrder = 'asc'
) => {
  const where = `
  {
    Slug_null: false
    published_at_null: false
    Catalog: {
      Slug: $slug
    }
    ${availablePostItemCondition()}
  }
  `;
  return useQuery<AvailablePostItemsGraphResult>(
    gql`
    query ($datetimeNow:Date, $slug:String, $start:Int, $limit:Int) {
      postItems (
        where: ${where}
        sort:"${useDisplayOrder ? `DisplayOrder:${seqDisplayOrder}` : 'createdAt:desc'}"
        start: $start
        limit: $limit
      ) {
        ${postItemProps}
      }
      ${postItemsConnection(where)}
    }
  `,
    {
      variables: {
        datetimeNow,
        slug,
        start,
        limit,
      },
      nextFetchPolicy: 'cache-first',
      fetchPolicy: 'cache-first',
    }
  );
};

export const GraphPostItemInCatalogId = (catalogId: string, datetimeNow: string, start: number, limit: number) => {
  const where = `
  {
    published_at_null: false
    Catalog: {
      id: $catalogId
    }
    ${availablePostItemCondition()}
  }
  `;
  return useQuery<AvailablePostItemsGraphResult>(
    gql`
    query ($datetimeNow:Date, $catalogId:String, $start:Int, $limit:Int) {
      postItems (
        where: ${where}
        sort:"createdAt:desc"
        start: $start
        limit: $limit
      ) {
        ${postItemProps}
      }
      ${postItemsConnection(where)}
    }
  `,
    {
      variables: {
        datetimeNow,
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
