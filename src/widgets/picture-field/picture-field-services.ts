import { gql, useQuery } from '@apollo/client';
import { PictureFieldGraphResult } from './picture-field-types';

export const GraphPictureField = (name: string) =>
  useQuery<PictureFieldGraphResult>(
    gql`
      query getPictureField($name: String!) {
        pictureFields(where: { Name: $name }) {
          id
          Name
          Url
          Picture {
            id
            Caption
            Media
          }
        }
      }
    `,
    {
      variables: {
        name,
      },
    }
  );
