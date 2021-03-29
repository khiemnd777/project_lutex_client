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
  formats: {
    thumbnail: ImageType;
    large: ImageType;
    medium: ImageType;
    small: ImageType;
  };
};

export type MediaType = {
  Caption: string;
  url: string;
  Media: {
    provider_metadata: {
      resource_type: string;
    };
    formats: {
      thumbnail: ImageType;
      large: ImageType;
      medium: ImageType;
      small: ImageType;
    };
  }[];
};

export type SingleMediaType = {
  Caption: string;
  Media: {
    url: string;
    provider_metadata: {
      resource_type: string;
    };
    formats: {
      thumbnail: ImageType;
      large: ImageType;
      medium: ImageType;
      small: ImageType;
    };
  };
};
