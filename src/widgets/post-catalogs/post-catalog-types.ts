import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';

export interface PostCatalogsWidgetArgs extends WidgetArgs {
  items?: PostCatalogType[];
  totalCount?: number;
  onShowMore?: (e: MouseEvent) => void;
}

export type RootPostCatalogGraphResult = {
  postCatalogsConnection: {
    aggregate: {
      totalCount: number;
    };
  };
  postCatalogs: PostCatalogType[];
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
