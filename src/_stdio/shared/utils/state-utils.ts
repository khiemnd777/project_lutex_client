import { ExecutedState } from '../enums/state-enums';

export const AreBeingInStates = (executedState: ExecutedState, ...beingStates: ExecutedState[]) => {
  for (let index = 0; index < beingStates.length; index++) {
    if (executedState === beingStates[index]) return true;
  }
  return false;
};

export const AreNotBeingInStates = (executedStated: ExecutedState, ...beingStates: ExecutedState[]) => {
  return !AreBeingInStates(executedStated, ...beingStates);
};
