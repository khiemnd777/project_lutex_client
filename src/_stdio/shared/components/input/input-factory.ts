import { each, every, filter, size } from 'lodash-es';
import { isStringEmpty } from '_stdio/shared/utils/string.utils';
import InputModel from './input-model';

export const ValidateInputs = (inputs: InputModel[]) => {
  // reset valid to true;
  each(inputs, (input) => (input.valid = true));
  // required?
  const requiredInputs = filter(inputs, (input) => !!input.required);
  if (!!size(requiredInputs)) {
    each(requiredInputs, (input) => {
      if (isStringEmpty(input.val)) {
        input.valid = false;
      }
    });
  }
  // email?
  const emailInputs = filter(inputs, (input) => input.type === 'email');
  if (!!size(emailInputs)) {
    const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    each(emailInputs, (input) => {
      if (!!input.val && !emailPattern.test(input.val)) {
        input.valid = false;
      }
    });
  }
  return every(inputs, (input) => !!input.valid);
};
