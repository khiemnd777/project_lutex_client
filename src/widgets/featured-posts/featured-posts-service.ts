import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
import { FeaturedPostGraphResult } from './featured-posts-types';

export const GraphFeaturedPosts = (name: string) =>
  useQuery<FeaturedPostGraphResult>(
    gql`
      query($name: String) {
        featuredPosts(where: { Name: $name }) {
          id
          Name
          FeaturedPosts {
            id
            Title
            Router{
              id
              Path
            }
            Post {
              id
              Title
              SubTitle
              Short
              Rate
              createdAt
              Slug
              Router{
                id
                Path
              }
              Catalog{
                DisplayName
                Slug
                Router{
                  id
                  Path
                }
              }
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
        name,
      },
      fetchPolicy: 'cache-first',
    }
  );
