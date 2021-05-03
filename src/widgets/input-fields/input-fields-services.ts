import { gql, useQuery } from '@apollo/client';
import { InputFieldsGraphResult } from './input-fields-types';

export const GraphInputFieldsByName = (name: string) =>
  useQuery<InputFieldsGraphResult>(
    gql`
      query inputFieldsGraph($name: String!) {
        inputFields(where: { Name: $name }) {
          id
          Name
          DisplayName
          InputFields {
            Name
            Title
            Type
            Placeholder
            Required
            DefaultValue
            VisibleTitle
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
