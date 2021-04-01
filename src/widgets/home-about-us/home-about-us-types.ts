import { EnumerationType } from '_stdio/shared/types/enumeration-types';
import { SingleMediaType } from '_stdio/shared/types/image-types';

export type HomeAboutUsGrapthResult = {
  homeAboutUs: HomeAboutUsType;
};

export type HomeAboutUsType = {
  id: string;
  Header: string;
  Title: string;
  Link: string;
  LinkText: string;
  Enumeration: EnumerationType[];
  Media: SingleMediaType[];
};
