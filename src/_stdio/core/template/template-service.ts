import axios from 'axios'
import { API_HOST } from '_stdio/environment'
import { TemplateType } from './template-types';

export const FetchTemplateById = async (id?: string) => {
  const result = await axios.get(`${API_HOST}template/${id}`);
  return result.data as TemplateType;
}