import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
import { FeaturePostGraphResult } from './feature-post-types';

export const GraphFeaturePost = (slug: string) =>
  useQuery<FeaturePostGraphResult>(
    gql`
      query($slug: String) {
        postCatalogs(where: { Slug: $slug }) {
          id
          Name
          DisplayName
          Slug
          Short
          FeaturePosts {
            id
            Title
            Router{
              id
              Path
            }
            Post {
              id
              Title
              createdAt
              Slug
              Cover {
                ${MediaGraphProps}
              }
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
