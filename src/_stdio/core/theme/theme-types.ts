export type ThemeWidgetType = {
  widgetName: string;
  style: Record<string, string>;
};

export type ThemeType = {
  id: string;
  Name: string;
  DisplayName: string;
};

export type ThemeGraphResultType = {
  environment: {
    Theme: {
      Theme: ThemeType;
    };
  };
};
