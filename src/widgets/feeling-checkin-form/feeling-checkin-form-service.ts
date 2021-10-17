import axios from 'axios';
import { API_HOST } from '_stdio/environment';
import { FeelingCheckinAnswer, FeelingCheckinForm } from './feeling-checkin-form-types';

export const FetchForm = async (formName: string) => {
  const result = await axios.get(`${API_HOST}feeling-checkin-form/${formName}`);
  return result.data as FeelingCheckinForm;
};

export const FetchNextForm = async (formName: string, answers: { id: string }[][]) => {
  const result = await axios.post(`${API_HOST}feeling-checkin-form/next`, {
    name: formName,
    answers,
  });
  return result.data as FeelingCheckinForm;
};

export const FetchAnswersByQuestion = async (questionId: string) => {
  const result = await axios.get(`${API_HOST}feeling-checkin-questions/${questionId}/answers`);
  return result.data as FeelingCheckinAnswer[];
};

export const AddFeelingCheckinContact = async (
  contact: {
    FullName: string;
    Email: string;
    PhoneNumber: string;
    Content: string;
  },
  answers: {
    question: string;
    answers: {
      value: string;
    }[];
  }[]
) => {
  const result = await axios.post(`${API_HOST}feeling-checkin-contacts/add`, {
    contact,
    answers,
  });
  return result.data;
};
