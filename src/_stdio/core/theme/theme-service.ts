import { gql, useQuery } from '@apollo/client';
import axios from 'axios';
import { API_HOST } from '_stdio/environment';
import { ThemeGraphResultType, ThemeType } from './theme-types';

export const FetchTheme = async () => {
  const result = await axios.get(`${API_HOST}environment/theme`);
  return result.data as ThemeType;
};

export const GraphTheme = () => {
  return useQuery<ThemeGraphResultType>(gql`
    query {
      environment {
        id
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
