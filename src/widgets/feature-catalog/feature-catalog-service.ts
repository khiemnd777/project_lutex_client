import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
import { FeatureCatalogGraphResult } from './feature-catalog-types';

export const GraphFeatureCatalog = (slug: string) =>
  useQuery<FeatureCatalogGraphResult>(
    gql`
      query($slug: String) {
        postCatalogs(where: { Slug: $slug }) {
          id
          Name
          DisplayName
          Slug
          Short
          FeatureCatalogs {
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
        slug,
      },
      fetchPolicy: 'no-cache',
    }
  );
