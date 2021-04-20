import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
import { LogoGraphResult } from './logo-types';

export const GraphLogo = () => {
  return useQuery<LogoGraphResult>(
    gql`
    query {
      environment {
        id
        Logo {
          ${MediaGraphProps}
        }
      }
    }
  `,
    {
      fetchPolicy: 'cache-first',
    }
  );
};
