import { gql, useQuery } from '@apollo/client';
import { ContactInformationGraphResult } from './contact-information-types';

export const GraphContactInformation = () => {
  return useQuery<ContactInformationGraphResult>(gql`
    query {
      contactInformation {
        id
        Parameters {
          Key
          Value
          Link
          Icon
          Label
        }
      }
    }
  `);
};
