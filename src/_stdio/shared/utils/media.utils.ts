import isEmpty from 'lodash-es/isEmpty';
import { MediaFormatEnums } from '../enums/image-enums';
import { ImageType, SingleMediaType } from '../types/image-types';

export const GetSingleMedia = (
  singleMedia: SingleMediaType,
  formatEnums: MediaFormatEnums = MediaFormatEnums.ordinary
) => {
  if (!singleMedia || isEmpty(singleMedia)) {
    return {
      url: '',
    } as ImageType;
  }
  const formats = singleMedia.Media?.formats;
  if (!isEmpty(formats)) {
    switch (formatEnums) {
      case MediaFormatEnums.large: {
        if (formats.large) {
          return formats.large;
        }
      }
      case MediaFormatEnums.medium: {
        if (formats.medium) {
          return formats.medium;
        }
      }
      case MediaFormatEnums.small: {
        if (formats.small) {
          return formats.small;
        }
      }
      case MediaFormatEnums.thumbnail: {
        if (formats.thumbnail) {
          return formats.thumbnail;
        }
      }
      default:
      case MediaFormatEnums.ordinary:
        {
          if (singleMedia.Media?.url) {
            return {
              url: singleMedia.Media?.url,
            } as ImageType;
          }
        }
        break;
    }
  }
  const media = singleMedia.Media;
  return {
    url: media?.url,
  } as ImageType;
};
