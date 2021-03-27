import axios from 'axios';
import { HOST } from '_stdio/environment';

export const GetDatetimeServer = async () => {
  const result = await axios(`${HOST}environment/datenow`);
  return result.data as Date;
};
