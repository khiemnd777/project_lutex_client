export type ContactInformationGraphResult = {
  contactInformation: ContactInformationType;
};

export type ContactInformationType = {
  id: string;
  Parameters: {
    Key: string;
    Value: string;
    Icon: string;
  }[];
};
