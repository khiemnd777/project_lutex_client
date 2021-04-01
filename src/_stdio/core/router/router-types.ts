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

type RouterTempalteType = {
  id: string;
  Name: string;
};

type RouterType = {
  id: string;
  Name: string;
  Path: string;
  template: RouterTempalteType;
  Enabled: boolean;
};

export type RouterResponseType = {
  routers: RouterType[];
};
