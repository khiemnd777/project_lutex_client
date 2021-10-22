import axios from 'axios';
import { API_HOST } from '_stdio/environment';
import { PostTagType } from './post-tags-type';

export const FetchAllTags = async () => {
  const result = await axios.get(`${API_HOST}post-tags/all`);
  return result.data as PostTagType[];
};
