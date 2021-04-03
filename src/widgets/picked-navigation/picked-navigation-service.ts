import { gql, useQuery } from '@apollo/client';
import { PickedNavigationGraphResult } from './picked-navigation-types';

export const GraphPickedNavigation = (name: string) => {
  return useQuery<PickedNavigationGraphResult>(
    gql`
      query($name: String) {
        navigations(where: { Name: $name }) {
          id
          Name
          DisplayName
          Icon
          Children {
            ... on ComponentNavigationCatalog {
              __typename
              id
              Children {
                id
                Name
                DisplayName
                Slug
              }
              Router {
                id
                Path
              }
            }
            ... on ComponentNavigationOthers {
              __typename
              id
              Children {
                id
                Name
                DisplayName
                Path
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        name,
      },
    }
  );
};
