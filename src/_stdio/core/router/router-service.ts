import { useQuery, gql } from '@apollo/client';
import { RouterResponseType } from './router-types';

export const GraphRouters = () => {
  const query = useQuery<RouterResponseType>(gql`
    query {
      routers(where: { Enabled: true }) {
        id
        Name
        Path
        template {
          Name
          Placeholders {
            Name
          }
        }
        Enabled
      }
    }
  `);
  return query;
};
