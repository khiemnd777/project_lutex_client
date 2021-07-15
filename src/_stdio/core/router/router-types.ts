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
  StyleName: string;
};

export type RouterType = {
  id: string;
  templateId: string;
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
