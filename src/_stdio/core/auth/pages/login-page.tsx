import classNames from 'classnames/bind';
import { find, map } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';
import Button from '_stdio/shared/components/button/button';
import Input from '_stdio/shared/components/input/input';
import { ValidateInputs } from '_stdio/shared/components/input/input-factory';
import InputModel from '_stdio/shared/components/input/input-model';
import { ExecutedState } from '_stdio/shared/enums/state-enums';
import { AreNotBeingInStates } from '_stdio/shared/utils/state-utils';
import { AuthLogin, AuthTeardown } from '../auth-service';
import styles from './login-page.styled.scss';

const cx = classNames.bind(styles);

const onSubmit = async (data: InputModel[], setExecutedState: StateUpdater<ExecutedState>) => {
  setExecutedState(ExecutedState.validating);
  if (ValidateInputs(data)) {
    setExecutedState(ExecutedState.validated);
    setExecutedState(ExecutedState.sendRequest);
    const identifier = find(data, (field) => field.name === 'email');
    const password = find(data, (field) => field.name === 'password');
    if (identifier?.val && password?.val) {
      const authInfo = await AuthLogin(identifier.val, password.val);
      console.log(authInfo);
      await AuthTeardown(authInfo);
      setExecutedState(ExecutedState.completed);
    }
    return;
  }
  setExecutedState(ExecutedState.failedValidating);
};

interface LoginPageArgs {}

const LoginPage: FunctionalComponent<LoginPageArgs> = () => {
  const [executedState, setExecutedState] = useState(() => ExecutedState.initial);
  const shownDisable = AreNotBeingInStates(
    executedState,
    ExecutedState.initial,
    ExecutedState.completed,
    ExecutedState.failedValidating
  );
  const models = [
    {
      title: `Email`,
      visibleTitle: true,
      name: 'email',
      required: true,
      placeholder: 'Email',
    },
    {
      title: `Password`,
      visibleTitle: true,
      name: 'password',
      type: 'password',
      required: true,
      placeholder: 'Password',
    },
  ] as InputModel[];
  const [inputModels] = useState(() => models);
  return (
    <div class={cx('login')}>
      <div class={cx('container')}>
        <div class={cx('fields', shownDisable ? 'disabled' : null)}>
          {map(inputModels, (model) => {
            return <Input data={model} />;
          })}
        </div>
      </div>
      <div class={cx('container')}>
        <div class={cx('actions', shownDisable ? 'disabled' : null)}>
          <Button
            value={`Login`}
            classed={cx('button', 'submit')}
            onClick={() => onSubmit(inputModels, setExecutedState)}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
