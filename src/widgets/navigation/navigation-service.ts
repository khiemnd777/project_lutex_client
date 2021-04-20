import { gql, useQuery } from '@apollo/client';
import {
  ChildrenNavigationGraphResult,
  DetailNavigationGraphResult,
  NavigationsGraphResult,
  RootNavigationGraphResult,
} from './navigation-types';

const navigationProps = `
  id
  Name
  DisplayName
  Path
  Icon
`;

const fullNavigationProps = `
  ${navigationProps}
  Children {
    ... on ComponentNavigationCatalog {
      __typename
      id
      Children{
        id
        Name
        DisplayName
        Slug
      }
      Router{
        id
        Path
      }
    }
    ... on ComponentNavigationOthers {
      __typename
      id
      Children{
        ${navigationProps}
      }
    }
  }
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

export const GraphNavigations = (root: boolean) => {
  return useQuery<NavigationsGraphResult>(
    gql`
      query($root: Boolean) {
        navigations(where: { Root: $root }) {
          ${fullNavigationProps}
        }
      }
    `,
    {
      variables: {
        root,
      },
      fetchPolicy: 'cache-first',
    }
  );
};

export const GraphNavigationsByName = (name: string) => {
  return useQuery<NavigationsGraphResult>(
    gql`
      query($name: String) {
        navigations(where: { Name: $name }) {
          ${fullNavigationProps}
        }
      }
    `,
    {
      variables: {
        name,
      },
      fetchPolicy: 'cache-first',
    }
  );
};
