export type ContactInformationGraphResult = {
  contactInformation: ContactInformationType;
};

export type ContactInformationType = {
  id: string;
  Parameters: {
    Key: string;
    Value: string;
    Link: string;
    Icon: string;
  }[];
};
