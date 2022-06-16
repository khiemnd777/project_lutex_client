import axios from 'axios';
import { map, zipObject } from 'lodash-es';
import { Fragment, FunctionalComponent, h } from 'preact';
import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { MacroFactory } from '_stdio/core/macros/macro-factory';
import { MacroArgs } from '_stdio/core/macros/macro-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { API_HOST } from '_stdio/environment';
import InputModel from '_stdio/shared/components/input/input-model';
import { ExecutedState } from '_stdio/shared/enums/state-enums';
import { GetParameterValueWithGeneric } from '_stdio/shared/utils/params.util';

const sendContactViaInputs = async (data?: InputModel[]) => {
  if (data) {
    const sendModel = zipObject(
      map(data, (x) => x.name),
      map(data, (x) => x.val)
    );
    const result = await axios.post(`${API_HOST}queued-emails/insert`, { ...sendModel, emailTemplate: 'contact' });
    return result.data;
  }
};

const ContactSend: FunctionalComponent<MacroArgs> = ({ theme, parameters }) => {
  const data = GetParameterValueWithGeneric<InputModel[]>('data', parameters);
  const setExecutedState = GetParameterValueWithGeneric<StateUpdater<ExecutedState>>('setExecutedState', parameters);
  const executedState = GetParameterValueWithGeneric<ExecutedState>('executedState', parameters);
  const [closedModal, setClosedModal] = useState(false);
  const cx = BuildClassNameBind(theme.Name, 'macro_contact_send');
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
          'contact_send',
          'message_info',
          executedState === ExecutedState.completed && !closedModal ? 'visible' : null
        )}
        onClick={() => setClosedModal(true)}
      >
        <div class={cx('overlay')}></div>
        <span>Your enquiry was sent!</span>
      </div>
    </Fragment>
  );
};

export default MacroFactory.Register('macro_contact_send', ContactSend);
