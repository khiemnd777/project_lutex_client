export const SlimImageGraphProps = `
  id
  url
  provider_metadata
  formats
`;

export const ImageGraphProps = `
  ${SlimImageGraphProps}
  name
  alternativeText
  caption
  ext
  mime
  size
`;

export const MediaGraphProps = `
  id
  Caption
  Media {
    ${SlimImageGraphProps}
  }
`;

export const IMAGE_FORMAT_THUMPNAIL = 'thumbnail';
export const IMAGE_FORMAT_LARGE = 'large';
export const IMAGE_FORMAT_MEDIUM = 'medium';
export const IMAGE_FORMAT_SMALL = 'small';
