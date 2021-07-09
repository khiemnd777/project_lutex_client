export type PostCatalogsGraphResult = {
  postCatalogs: PostCatalogType[];
};

export type PostCatalogType = {
  id: string;
  Name: string;
  DisplayName: string;
  Slug: string;
  Short: string;
  Root: boolean;
  Icon: string;
  Router: {
    id: string;
    Path: string;
  };
  DisplayOrder: number;
};
