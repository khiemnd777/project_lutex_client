import { gql, useQuery } from '@apollo/client';
import {
  ChildrenPostCatalogGraphResult,
  DetailPostCatalogGraphResult,
  RootPostCatalogGraphResult,
} from './post-catalog-types';

const postCatalogProps = `
  id
  Name
  DisplayName
  Slug
  Root
  Icon
  Router {
    id
    Path
  }
  DisplayOrder
`;

export const GraphRootPostCatalogs = (start: number, limit: number) => {
  return useQuery<RootPostCatalogGraphResult>(
    gql`
    query Feed ($start:Int, $limit:Int) {
      postCatalogsConnection{
        aggregate{
          totalCount
        }
      }
      postCatalogs(
        where: { Root: true }
        sort: "DisplayOrder:asc"
        start: $start
        limit: $limit
      ){
        ${postCatalogProps}
      }
    }
  `,
    {
      variables: {
        start,
        limit,
      },
    }
  );
};

export const GraphDetailPostCatalog = (postCatalogId: string) => {
  return useQuery<DetailPostCatalogGraphResult>(gql`
    query {
      postCatalog(id: "${postCatalogId}") {
        ${postCatalogProps}
      }
    }
  `);
};

export const GraphChildrenPostCatalogs = (parentId: string) => {
  return useQuery<ChildrenPostCatalogGraphResult>(gql`
    query {
      postCatalogs(where: { id: "${parentId}" }) {
        id
        Name
        Children {
          ${postCatalogProps}
        }
      }
    }
  `);
};
