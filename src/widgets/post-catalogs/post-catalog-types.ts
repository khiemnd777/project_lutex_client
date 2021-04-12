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
