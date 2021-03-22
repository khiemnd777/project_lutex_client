export type RootProductCatalogGraphResult = {
  productCatalogs: NavigationType[];
};

export type ChildrenProductCatalogGraphResult = {
  productCatalogs: {
    id: string;
    Name: string;
    Children: ProductCatalogType[];
  }[];
};

export type DetailProductCatalogGraphResult = {
  productCatalog: ProductCatalogType;
};

export type ProductCatalogType = {
  id: string;
  Name: string;
  DisplayName: string;
  Slug: string;
  Root: boolean;
  Icon: string;
  DisplayOrder: number;
};
