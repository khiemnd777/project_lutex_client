import { useQuery, gql } from '@apollo/client';
import axios from 'axios';
import { API_HOST, CLIENT_HOST } from '_stdio/environment';
import { RouterResponseType, RouterType } from './router-types';

export const GraphRouters = () => {
  const query = useQuery<RouterResponseType>(gql`
    query {
      routers(where: { Enabled: true }) {
        id
        Name
        Path
        template {
          id
          Name
          StyleName
        }
        Enabled
        IsAuth
      }
    }
  `);
  return query;
};

export const FetchAllRouters = async () => {
  const result = await axios.get(`${API_HOST}routers/all`);
  return result.data as RouterType[];
};

export const FetchRouters = async () => {
  const result = await axios.get(`${CLIENT_HOST}routers`);
  return result.data as RouterType[];
}
