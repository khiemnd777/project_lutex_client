import { gql, useQuery } from '@apollo/client';
import { RouterWidgetResponseType, TemplateWidgetResponseType } from './widget-types';

export const GraphWidgetByRouter = (routerId: string) => {
  const query = useQuery<RouterWidgetResponseType>(
    gql`
      query($routerId: String) {
        routers(where: { id: $routerId, Enabled: true }) {
          Widgets {
            ... on ComponentPluginsWidget {
              Enabled
              Placeholder
              ConfigurationName
              widget {
                Name
                ConfigurationName
                Parameters {
                  Name
                  Value
                }
              }
              Parameters {
                Name
                Value
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        routerId,
      },
    }
  );
  return query;
};

export const GraphWidgetByTemplate = (templateId: string) => {
  return useQuery<TemplateWidgetResponseType>(
    gql`
      query($templateId: String) {
        templates(where: { id: $templateId }) {
          Widgets {
            ... on ComponentPluginsWidget {
              Enabled
              Placeholder
              ConfigurationName
              widget {
                Name
                ConfigurationName
                Parameters {
                  Name
                  Value
                }
              }
              Parameters {
                Name
                Value
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        templateId,
      },
    }
  );
};
