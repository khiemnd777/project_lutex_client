import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';

export interface PostCatalogsSideColumnWidgetArgs extends WidgetArgs {
  items: PostCatalogType[];
  [x: string]: any;
}

export type RootPostCatalogGraphResult = {
  postCatalogs: NavigationType[];
};

export type ChildrenPostCatalogGraphResult = {
  postCatalogs: {
    id: string;
    Name: string;
    Children: PostCatalogType[];
  }[];
};

export type DetailPostCatalogGraphResult = {
  postCatalog: PostCatalogType;
};

export type PostCatalogType = {
  id: string;
  Name: string;
  DisplayName: string;
  Slug: string;
  Root: boolean;
  Icon: string;
  DisplayOrder: number;
};
