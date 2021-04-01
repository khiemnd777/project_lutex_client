export type ImageType = {
  name: string;
  alternativeText: string;
  caption: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
  width: number;
  height: number;
};

export type FullImageType = {
  name: string;
  alternativeText: string;
  caption: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
  formats: MediaFormats;
};

export type MultipleMediaType = {
  Caption: string;
  Media: MediaType[];
};

export type SingleMediaType = {
  Caption: string;
  Media: MediaType;
};

export type MediaType = {
  id: string;
  url: string;
  provider_metadata: {
    resource_type: string;
  };
  formats: MediaFormats;
};

export type MediaFormats = {
  thumbnail: ImageType;
  large: ImageType;
  medium: ImageType;
  small: ImageType;
};
