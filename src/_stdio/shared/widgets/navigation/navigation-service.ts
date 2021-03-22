import { gql, useQuery } from '@apollo/client';
import {
  ChildrenNavigationGraphResult,
  DetailNavigationGraphResult,
  RootNavigationGraphResult,
} from './navigation-types';

const navigationProps = `
  id
  Name
  Root
  Path
  Icon
  DisplayOrder
`;

export const GraphRootNavigations = () => {
  const query = useQuery<RootNavigationGraphResult>(gql`
    query {
      navigations(where: { Root: true, Enabled: true }) {
        ${navigationProps}
      }
    }
  `);
  return query;
};

export const GraphDetailNavigation = (navigationId) => {
  return useQuery<DetailNavigationGraphResult>(gql`
    query {
      navigation(id: "${navigationId}") {
        ${navigationProps}
      }
    }
  `);
};

export const GraphChildrenNavigations = (parentId: string) => {
  const query = useQuery<ChildrenNavigationGraphResult>(gql`
    query {
      navigations(where: { id: "${parentId}", Enabled: true }) {
        id
        Name
        Children(where: { Enabled: true }) {
          ${navigationProps}
        }
      }
    }
  `);
  return query;
};
