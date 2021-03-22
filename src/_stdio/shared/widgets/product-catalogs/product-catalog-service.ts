import { gql, useQuery } from '@apollo/client';
import {
  ChildrenProductCatalogGraphResult,
  DetailProductCatalogGraphResult,
  RootProductCatalogGraphResult,
} from './product-catalog-types';

const productCatalogProps = `
  id
  Name
  Slug
  Root
  Icon
  DisplayOrder
`;

export const GraphRootProductCatalogs = () => {
  return useQuery<RootProductCatalogGraphResult>(gql`
    query {
      productCatalogs(where: { Root: true }) {
        ${productCatalogProps}
      }
    }
  `);
};

export const GraphDetailProductCatalog = (productCatalogId: string) => {
  return useQuery<DetailProductCatalogGraphResult>(gql`
    query {
      productCatalog(id: "${productCatalogId}") {
        ${productCatalogProps}
      }
    }
  `);
};

export const GraphChildrenProductCatalogs = (parentId: string) => {
  return useQuery<ChildrenProductCatalogGraphResult>(gql`
    query {
      productCatalogs(where: { id: "${parentId}" }) {
        id
        Name
        Children {
          ${productCatalogProps}
        }
      }
    }
  `);
};
