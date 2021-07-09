import { gql, useQuery } from '@apollo/client';
import {
  PostCatalogsGraphResult,
} from './post-catalog-types';

export const GraphCatalog = (slug: string) =>
  useQuery<PostCatalogsGraphResult>(
    gql`
      query($slug: String) {
        postCatalogs(where: { Slug: $slug }) {
          id
          Name
          DisplayName
          Slug
          Short
          Router {
            id
            Path
          }
          DisplayOrder
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