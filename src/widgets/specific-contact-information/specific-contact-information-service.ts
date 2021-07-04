import axios from 'axios';
import { API_HOST } from '_stdio/environment';
import { SpecificContactInformationModel } from './specific-contact-information-interfaces';

export const FetchContactInformationByKey = async (key: string) => {
  const result = await axios(`${API_HOST}contact-information/${key}`);
  return result.data as SpecificContactInformationModel;
};
