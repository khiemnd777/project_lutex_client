import { SingleMediaType } from '_stdio/shared/types/image-types';

export type PictureFieldGraphResult = {
  pictureFields: PictureFieldType[];
};

export type PictureFieldType = {
  id: string;
  Name: string;
  Url: string;
  Picture?: SingleMediaType;
};
