import isEmpty from 'lodash-es/isEmpty';
import { MediaFormatEnums } from '../enums/image-enums';
import { ImageType, SingleMediaType } from '../types/image-types';

export const GetSingleMedia = (
  singleMedia: SingleMediaType,
  formatEnums: MediaFormatEnums = MediaFormatEnums.ordinary
) => {
  if (isEmpty(singleMedia)) {
    return {
      url: '',
    } as ImageType;
  }
  const formats = singleMedia.Media.formats;
  if (!isEmpty(formats)) {
    switch (formatEnums) {
      case MediaFormatEnums.thumbnail: {
        if (formats.thumbnail) {
          return formats.thumbnail;
        }
      }
      case MediaFormatEnums.small: {
        if (formats.small) {
          return formats.small;
        }
      }
      case MediaFormatEnums.medium: {
        if (formats.medium) {
          return formats.medium;
        }
      }
      case MediaFormatEnums.large: {
        if (formats.large) {
          return formats.large;
        }
      }
      default:
        break;
    }
  }
  const media = singleMedia.Media;
  return {
    url: media.url,
  } as ImageType;
};
