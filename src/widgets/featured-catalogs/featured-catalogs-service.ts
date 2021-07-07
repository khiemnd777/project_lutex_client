import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
import { FeaturedCatalogsGraphResult } from './featured-catalogs-types';

export const GraphFeaturedCatalogs = (name: string) =>
  useQuery<FeaturedCatalogsGraphResult>(
    gql`
      query($name: String) {
        featuredCatalogs(where: { Name: $name }) {
          id
          Name
          FeaturedCatalogs {
            id
            Title
            BackgroundColor
            Router {
              id
              Path
            }
            Catalog {
              id
              DisplayName
              createdAt
              Slug
            }
            Media {
              ${MediaGraphProps}
            }
          }
        }
      }
    `,
    {
      variables: {
        name,
      },
      fetchPolicy: 'no-cache',
    }
  );
