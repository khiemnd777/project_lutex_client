import { find } from 'lodash-es';
import { Fragment, FunctionalComponent, h } from 'preact';
import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { AddFeelingCheckinContact } from 'widgets/feeling-checkin-form/feeling-checkin-form-service';
import {
  AddFeelingAnswers,
  AddFeelingContact,
  FeelingContactSender,
} from 'widgets/feeling-checkin-form/feeling-checkin-form-types';
import { MacroFactory } from '_stdio/core/macros/macro-factory';
import { MacroArgs } from '_stdio/core/macros/macro-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { ExecutedState } from '_stdio/shared/enums/state-enums';
import { GetParameterValueWithGeneric } from '_stdio/shared/utils/params.util';

const sendContactViaInputs = async (data?: AddFeelingContact) => {
  if (data) {
    await AddFeelingCheckinContact(data);
  }
};

const prepareModel = (data: FeelingContactSender) => {
  return {
    contact: {
      FullName: find(data.inputFields, (f) => f.name === 'fullname')?.val,
      Email: find(data.inputFields, (f) => f.name === 'email')?.val,
      PhoneNumber: find(data.inputFields, (f) => f.name === 'phone')?.val,
      Content: find(data.inputFields, (f) => f.name === 'content')?.val,
    },
    answers: JSON.parse(JSON.stringify(data.answers)) as AddFeelingAnswers[],
  } as AddFeelingContact;
};

const ContactSend: FunctionalComponent<MacroArgs> = ({ theme, parameters }) => {
  const data = GetParameterValueWithGeneric<FeelingContactSender>('data', parameters);
  const setExecutedState = GetParameterValueWithGeneric<StateUpdater<ExecutedState>>('setExecutedState', parameters);
  const executedState = GetParameterValueWithGeneric<ExecutedState>('executedState', parameters);
  const [closedModal, setClosedModal] = useState(false);
  const cx = BuildClassNameBind(theme.Name, 'macro_feeling_checkin_contact_send');
  useEffect(() => {
    if (executedState === ExecutedState.sendRequest) {
      if (data) {
        const model = prepareModel(data);
        void sendContactViaInputs(model)
          .then(() => {
            setExecutedState?.call(null, ExecutedState.completed);
          })
          .catch((error) => {
            setExecutedState?.call(null, ExecutedState.completed);
            console.log(error);
          });
      }
    }
  }, [executedState]);
  useEffect(() => {
    if (executedState === ExecutedState.completed && closedModal) {
      setExecutedState?.call(null, ExecutedState.initial);
      setClosedModal(false);
    }
  }, [closedModal]);
  return (
    <Fragment>
      <div
        class={cx(
          'feeling_checkin_contact_send',
          'message_info',
          executedState === ExecutedState.completed && !closedModal ? 'visible' : null
        )}
        onClick={() => setClosedModal(true)}
      >
        <div class={cx('overlay')}></div>
        <span>
          {`Cảm ơn bạn đã dành thời gian, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Trân trọng!`}
        </span>
      </div>
    </Fragment>
  );
};

export default MacroFactory.Register('macro_feeling_checkin_contact_send', ContactSend);
