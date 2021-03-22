export type RootNavigationGraphResult = {
  navigations: NavigationType[];
};

export type ChildrenNavigationGraphResult = {
  navigations: {
    id: string;
    Name: string;
    Children: NavigationType[];
  }[];
};

export type DetailNavigationGraphResult = {
  navigations: NavigationType;
};

export type NavigationType = {
  id: string;
  Name: string;
  Root: boolean;
  Path: string;
  Icon: string;
  DisplayOrder: number;
};
