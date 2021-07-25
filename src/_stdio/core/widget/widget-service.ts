import { gql, useQuery } from '@apollo/client';
import axios from 'axios';
import { API_HOST, CLIENT_HOST } from '_stdio/environment';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
import { RouterWidgetResponseType, TemplateWidgetResponseType, WidgetType } from './widget-types';

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

export const FetchWidgetsByRouter = async (routerId: string) => {
  const result = await axios.get(`${API_HOST}routers/${routerId}/widgets`);
  return result.data as WidgetType[];
};

export const FetchWidgetsByRouterName = async (routerName: string) => {
  const result = await axios.get(`${CLIENT_HOST}routers/${routerName}/widgets`);
  return result.data as WidgetType[];
};

export const FetchWidgetsByTemplate = async (templateId?: string) => {
  const result = await axios.get(`${API_HOST}templates/${templateId}/widgets`);
  return result.data as WidgetType[];
};

export const FetchWidgetsByTemplateName = async (templateName?: string) => {
  const result = await axios.get(`${CLIENT_HOST}templates/${templateName}/widgets`);
  return result.data as WidgetType[];
};
