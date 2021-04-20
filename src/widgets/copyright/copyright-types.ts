import { SingleMediaType } from '_stdio/shared/types/image-types';

export type CopyrightGraphResult = {
  environment: CopyrightType;
};

export type CopyrightType = {
  id: string;
  Logo: SingleMediaType;
  Copyright: string;
  PoweredBy: string;
};
