import { find, first, isEmpty, size } from 'lodash-es';
import { Fragment, FunctionalComponent, h } from 'preact';
import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { MacroFactory } from '_stdio/core/macros/macro-factory';
import { MacroArgs } from '_stdio/core/macros/macro-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import InputModel from '_stdio/shared/components/input/input-model';
import { ExecutedState } from '_stdio/shared/enums/state-enums';
import { SubscriberType } from '_stdio/shared/types/subscriber-types';
import { GetParameterValueWithGeneric } from '_stdio/shared/utils/params.util';
import { GraphSubscription, RegisterNewSubscription, Resubscription } from './subscription-services';

const RegisterSubscription: FunctionalComponent<MacroArgs> = ({ theme, parameters }) => {
  const cx = BuildClassNameBind(theme.Name, 'macro_register_subscription');
  const inputFields = GetParameterValueWithGeneric<InputModel[]>('data', parameters);
  const setExecutedState = GetParameterValueWithGeneric<StateUpdater<ExecutedState>>('setExecutedState', parameters);
  const executedState = GetParameterValueWithGeneric<ExecutedState>('executedState', parameters);
  const [closedModal, setClosedModal] = useState(false);
  const [registerNewSubscriptionFunc, registerNewSubscriptionOps] = RegisterNewSubscription();
  const [resubscriptionFunc, resubscriptionOps] = Resubscription();
  const [flag, setFlag] = useState('new-subscription');
  switch (executedState) {
    case ExecutedState.executing:
      {
        if (flag === 'new-subscription') {
          if (!registerNewSubscriptionOps.loading) {
            setExecutedState?.call(null, ExecutedState.executed);
          }
        }
        if (flag === 'resubscription') {
          if (!resubscriptionOps.loading) {
            setExecutedState?.call(null, ExecutedState.executed);
          }
        }
      }
      break;
    case ExecutedState.executed:
      {
        if (flag === 'new-subscription') {
          if (registerNewSubscriptionOps.error) {
            setExecutedState?.call(null, ExecutedState.error);
          }
          if (registerNewSubscriptionOps.data) {
            setExecutedState?.call(null, ExecutedState.completed);
          }
        }
        if (flag === 'resubscription') {
          if (resubscriptionOps.error) {
            setExecutedState?.call(null, ExecutedState.error);
          }
          if (resubscriptionOps.data) {
            setExecutedState?.call(null, ExecutedState.completed);
          }
        }
      }
      break;
    case ExecutedState.sendRequest:
      {
        const subscriberVal = find(inputFields, (field) => field.name === 'subscriber')?.val ?? '';
        const { data, loading, error } = GraphSubscription(subscriberVal);
        if (!!data && !loading && !error) {
          const subscriberData =
            !!data && !loading && !error && !!size(data.subscribers)
              ? first(data.subscribers) ?? ({} as SubscriberType)
              : ({} as SubscriberType);
          if (isEmpty(subscriberData)) {
            setFlag('new-subscription');
            setExecutedState?.call(null, ExecutedState.executing);
            void registerNewSubscriptionFunc({
              variables: {
                email: subscriberVal,
              },
            });
          } else if (!subscriberData.published_at) {
            setFlag('resubscription');
            setExecutedState?.call(null, ExecutedState.executing);
            void resubscriptionFunc({
              variables: {
                id: subscriberData.id,
                publishedAt: new Date(),
              },
            });
          } else {
            setExecutedState?.call(null, ExecutedState.completed);
          }
        }
      }
      break;
    default:
      break;
  }
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
          'register_subscription',
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

MacroFactory.Register('register_subscription', RegisterSubscription);
