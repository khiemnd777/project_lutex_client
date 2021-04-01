import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps, SlimImageGraphProps } from '_stdio/shared/constants/image-constants';
import { HomeAboutUsGrapthResult } from './home-about-us-types';

export const GraphHomeAboutUs = () => {
  return useQuery<HomeAboutUsGrapthResult>(gql`
    query {
      homeAboutUs {
        id
        Header
        Title
        Link
        LinkText
        Enumeration {
          id
          Text
          Link
          MediaIcon {
            ${SlimImageGraphProps}
          }
        }
        Media {
          ${MediaGraphProps}
        }
      }
    }
  `);
};
