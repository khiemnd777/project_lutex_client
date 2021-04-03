import { SingleMediaType } from '_stdio/shared/types/image-types';

export type FeatureCatalogGraphResult = {
  postCatalogs: FeatureCatalogType[];
};

export type FeatureCatalogType = {
  id: string;
  Name: string;
  DisplayName: string;
  Slug: string;
  Short: string;
  FeatureCatalogs: FeatureDetailCatalogType[];
};

export type FeatureDetailCatalogType = {
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
