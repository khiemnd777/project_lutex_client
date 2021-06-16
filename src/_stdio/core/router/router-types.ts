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

export type RouterType = {
  id: string;
  Name: string;
  Path: string;
  template: RouterTempalteType;
  Enabled: boolean;
  isAuth: boolean;
};

export type SimpleRouterType = {
  id: string;
  Path: string;
};

export type RouterResponseType = {
  routers: RouterType[];
};
