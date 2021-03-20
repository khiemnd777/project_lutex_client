type RouterPlaceholderType = {
  Name: string;
};

type RouterWidgetDetailType = {
  Name: string;
  ConfigurationName: string;
};

export type RouterWidgetType = {
  Enabled: boolean;
  Placeholder: string;
  widget: RouterWidgetDetailType;
};

type RouterTempalteType = {
  Name: string;
  Placeholders: RouterPlaceholderType[];
};

type RouterType = {
  Name: string;
  Path: string;
  template: RouterTempalteType;
  Widgets: RouterWidgetType[];
  Enabled: boolean;
};

export type RouterResponseType = {
  routers: RouterType[];
};
