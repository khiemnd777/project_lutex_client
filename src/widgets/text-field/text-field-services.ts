import { gql, useQuery } from '@apollo/client';
import { TextFieldsGraphResult } from './text-field-types';

export const GraphTextFields = (name: string) =>
  useQuery<TextFieldsGraphResult>(
    gql`
      query getTextField($name: String!) {
        textFields(where: { Name: $name }) {
          id
          Name
          Content
        }
      }
    `,
    {
      variables: {
        name,
      },
    }
  );
