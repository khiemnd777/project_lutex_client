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
  DisplayOrder
`;

export const GraphRootPostCatalogs = () => {
  return useQuery<RootPostCatalogGraphResult>(gql`
    query {
      postCatalogs(where: { Root: true }) {
        ${postCatalogProps}
      }
    }
  `);
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
