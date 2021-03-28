import { ChildrenNavigationEnum } from './navigation-enums';

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
  DisplayName: string;
  Root: boolean;
  Path: string;
  Icon: string;
  DisplayOrder: number;
};

export type FullNavigationType = {
  id: string;
  Name: string;
  DisplayName: string;
  Root: string;
  Path: string;
  Icon: string;
  DisplayOrder: string;
  Children: ChildrenNavigationType[];
};

export type ChildrenNavigationType = {
  __typename: ChildrenNavigationEnum;
  id: string;
  Children: {
    id: string;
    Name: string;
    DisplayName: string;
    Slug: string;
    Path: string;
  }[];
  Router: {
    id: string;
    Path: string;
  };
};

export type PostCatalogNavItemType = {
  id: string;
  Name: string;
  DisplayName: string;
  Slug: string;
  RouterPath: string;
};

export type OtherNavItemType = {
  id: string;
  Name: string;
  DisplayName: string;
  Path: string;
};

export type NavigationsGraphResult = {
  navigations: FullNavigationType[];
};
