import axios from 'axios';
import { API_HOST } from '_stdio/environment';

export const GetDatetimeServer = async () => {
  const result = await axios(`${API_HOST}environment/datenow`);
  return result.data as Date;
};
