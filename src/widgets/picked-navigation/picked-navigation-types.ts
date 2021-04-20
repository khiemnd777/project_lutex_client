import { ChildrenNavigationEnum } from './picked-navigation-enums';

export type PickedNavigationGraphResult = {
  navigations: PickedNavigationType[];
};

export type PickedNavigationType = {
  id: string;
  Name: string;
  DisplayName: string;
  Icon: string;
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
