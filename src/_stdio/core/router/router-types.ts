type RouterWidgetDetailType = {
  Name: string;
  ConfigurationName: string;
};

export type RouterWidgetType = {
  Enabled: boolean;
  Placeholder: string;
  ConfigurationName: string;
  widget: RouterWidgetDetailType;
};

export type RouterType = {
  id: string;
  templateId: string;
  TemplateName: string;
  TemplateStyleName: string;
  Name: string;
  Path: string;
  Enabled: boolean;
  IsAuth: boolean;
};

export type SimpleRouterType = {
  id: string;
  Path: string;
};

export type RouterResponseType = {
  routers: RouterType[];
};
