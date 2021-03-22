export type ImageType = {
  name: string;
  alternativeText: string;
  caption: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
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
