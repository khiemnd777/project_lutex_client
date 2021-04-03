import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
import { RouterWidgetResponseType, TemplateWidgetResponseType } from './widget-types';

const widgetProps = `
  Widgets {
    ... on ComponentPluginsWidget {
      Enabled
      Placeholder
      ConfigurationName
      BackgroundColor
      BackgroundImage{
        ${MediaGraphProps}
      }
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
`;

export const GraphWidgetByRouter = (routerId: string) => {
  const query = useQuery<RouterWidgetResponseType>(
    gql`
      query($routerId: String) {
        routers(where: { id: $routerId, Enabled: true }) {
          ${widgetProps}
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
          ${widgetProps}
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
