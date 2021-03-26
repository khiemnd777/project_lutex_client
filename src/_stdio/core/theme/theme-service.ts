import { gql, useQuery } from '@apollo/client';
import { ThemeGraphResultType } from './theme-types';

export const GraphTheme = () => {
  return useQuery<ThemeGraphResultType>(gql`
    query {
      environment {
        Theme {
          Theme {
            id
            Name
            DisplayName
          }
        }
      }
    }
  `);
};
