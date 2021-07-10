import { gql, useQuery } from '@apollo/client';
import { MediaGraphProps } from '_stdio/shared/constants/image-constants';
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
            ${MediaGraphProps}
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
