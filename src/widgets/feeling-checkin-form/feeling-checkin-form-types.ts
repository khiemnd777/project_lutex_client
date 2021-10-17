import InputModel from '_stdio/shared/components/input/input-model';

export type FeelingCheckinAnswer = {
  id: string;
  Type: string;
  Name: string;
  Answer: string;
  Selected: boolean;
};

export type FeelingCheckinQuestion = {
  id: string;
  Layout: string;
  MultipleChoice: boolean;
  Question: string;
  Answers: FeelingCheckinAnswer[];
};

export type FeelingCheckinForm = {
  id: string;
  Start: boolean;
  Completed: boolean;
  Header: string;
  Name: string;
  Questions: FeelingCheckinQuestion[];
};

export type FeelingContactSender = {
  inputFields: InputModel[];
  answers: FeelingCheckinQuestion[];
};
