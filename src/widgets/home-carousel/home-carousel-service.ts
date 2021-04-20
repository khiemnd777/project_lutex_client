import { gql, useQuery } from '@apollo/client';
import { HomeCarouselGraphResult } from './home-carousel-types';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';

export const GraphHomeCarousel = () => {
  return useQuery<HomeCarouselGraphResult>(gql`
    query {
      homeCarousel {
        id
        Media {
          ${MediaGraphProps}
        }
      }
    }
  `);
};
