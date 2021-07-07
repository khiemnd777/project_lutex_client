import { SingleMediaType } from '_stdio/shared/types/image-types';

export type FeaturedCatalogsGraphResult = {
  featuredCatalogs: FeaturedCatalogType[];
};

export type FeaturedCatalogType = {
  Name: string;
  FeaturedCatalogs: FeaturedDetailCatalogType[];
};

export type FeaturedDetailCatalogType = {
  id: string;
  Title: string;
  BackgroundColor: string;
  Catalog: CatalogType;
  Router: {
    id: string;
    Path: string;
  };
  Media: SingleMediaType[];
};

export type CatalogType = {
  id: string;
  DisplayName: string;
  createdAt: Date;
  Slug: string;
};

export type VisualizedCatalogType = {
  Title: string;
  BackgroundColor: string;
  Url: string;
  Cover?: SingleMediaType;
};
