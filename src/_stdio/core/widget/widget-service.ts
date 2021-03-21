import { gql, useQuery } from '@apollo/client';
import { WidgetResponseType } from './widget-types';

export const GraphWidgetByRouter = (routerId: string) => {
  const query = useQuery<WidgetResponseType>(gql`
    query {
      routers(where: { id: "${routerId}", Enabled: true }) {
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
      }
    }
  `);
  return query;
};
