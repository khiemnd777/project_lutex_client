import { gql, useQuery } from '@apollo/client';
import { CopyrightGraphResult } from './copyright-types';

export const GraphCopyright = () => {
  return useQuery<CopyrightGraphResult>(gql`
    query {
      environment {
        id
        Logo {
          Caption
          Media {
            url
            formats
          }
        }
        Copyright
        PoweredBy
      }
    }
  `);
};
