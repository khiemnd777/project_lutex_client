import { useQuery, gql } from '@apollo/client';
import { RouterResponseType } from './router-types';

export const GraphRouters = () => {
  const query = useQuery<RouterResponseType>(gql`
    query {
      routers(where: { Enabled: true }) {
        Name
        Path
        template {
          Name
          Placeholders {
            Name
          }
        }
        Widgets {
          ... on ComponentPluginsWidget {
            Enabled
            Placeholder
            ConfigurationName
            widget {
              Name
              ConfigurationName
            }
          }
        }
        Enabled
      }
    }
  `);
  return query;
};
