export type InputFieldsGraphResult = {
  inputFields: {
    id: string;
    Name: string;
    InputFields: InputFieldType[];
  }[];
};

export type InputFieldType = {
  Name: string;
  Title: string;
  Type: string;
  Placeholder: string;
  Required: boolean;
  VisibleTitle: boolean;
  DefaultValue: string;
};
