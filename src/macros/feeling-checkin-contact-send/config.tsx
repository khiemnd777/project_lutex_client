import { Fragment, FunctionalComponent, h } from 'preact';
import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { FeelingContactSender } from 'widgets/feeling-checkin-form/feeling-checkin-form-types';
import { MacroFactory } from '_stdio/core/macros/macro-factory';
import { MacroArgs } from '_stdio/core/macros/macro-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import InputModel from '_stdio/shared/components/input/input-model';
import { ExecutedState } from '_stdio/shared/enums/state-enums';
import { GetParameterValueWithGeneric } from '_stdio/shared/utils/params.util';

const sendContactViaInputs = (data?: InputModel[]) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

const ContactSend: FunctionalComponent<MacroArgs> = ({ theme, parameters }) => {
  const data = GetParameterValueWithGeneric<FeelingContactSender>('data', parameters);
  const setExecutedState = GetParameterValueWithGeneric<StateUpdater<ExecutedState>>('setExecutedState', parameters);
  const executedState = GetParameterValueWithGeneric<ExecutedState>('executedState', parameters);
  const [closedModal, setClosedModal] = useState(false);
  const cx = BuildClassNameBind(theme.Name, 'macro_feeling_checkin_contact_send');
  useEffect(() => {
    if (executedState === ExecutedState.sendRequest) {
      void sendContactViaInputs(data)
        .then(() => {
          setExecutedState?.call(null, ExecutedState.completed);
        })
        .catch((error) => {
          setExecutedState?.call(null, ExecutedState.completed);
          console.log(error);
        });
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
