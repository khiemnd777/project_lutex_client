import { map, size } from 'lodash-es';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';
import { MacroFactory } from '_stdio/core/macros/macro-factory';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import Button from '_stdio/shared/components/button/button';
import Input from '_stdio/shared/components/input/input';
import { ValidateInputs } from '_stdio/shared/components/input/input-factory';
import InputModel from '_stdio/shared/components/input/input-model';
import { ExecutedState } from '_stdio/shared/enums/state-enums';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { AreNotBeingInStates } from '_stdio/shared/utils/state-utils';
import { DefaultParams } from './input-fields-constants';
import { InputFieldWidgetArgs } from './input-fields-interfaces';

const onSubmit = (data: InputModel[], setExecutedState: StateUpdater<ExecutedState>) => {
  setExecutedState(ExecutedState.validating);
  if (ValidateInputs(data)) {
    setExecutedState(ExecutedState.validated);
    setExecutedState(ExecutedState.sendRequest);
    return;
  }
  setExecutedState(ExecutedState.failedValidating);
};

const InputFieldsWidget: FunctionalComponent<InputFieldWidgetArgs> = ({ theme, data, parameters }) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams) || 'input_fields';
  const cx = BuildClassNameBind(theme.Name, styleName);
  // consume macro.
  const macroName = GetParameterValue('macro', parameters, DefaultParams);
  const actionLayout = GetParameterValue('actionLayout', parameters, DefaultParams) || 'top-bottom';
  const submitText = GetParameterValue('submitText', parameters, DefaultParams) || 'Submit';
  const submitClassName = GetParameterValue('submitClassName', parameters, DefaultParams) || 'submit';
  const macroComponent = MacroFactory.Get(macroName);
  const [executedState, setExecutedState] = useState(() => ExecutedState.initial);
  const inputModelsParsed = map(data, (inputField) => {
    return {
      title: inputField.Title,
      name: inputField.Name,
      required: inputField.Required,
      type: inputField.Type,
      val: inputField.DefaultValue,
      visibleTitle: inputField.VisibleTitle,
    } as InputModel;
  });
  const [inputModels, setInputModels] = useState<InputModel[]>(() => inputModelsParsed);
  if (!size(inputModels) && size(data)) {
    setInputModels(inputModelsParsed);
  }
  const shownDisable = AreNotBeingInStates(
    executedState,
    ExecutedState.initial,
    ExecutedState.completed,
    ExecutedState.failedValidating
  );
  return (
    <Fragment>
      <div
        class={cx(
          'input_fields',
          actionLayout === 'top-bottom' ? 'top_bottom' : 'left_right',
          size(data) ? 'visible' : null
        )}
      >
        <div class={cx('fields', shownDisable ? 'disabled' : null)}>
          {!!size(inputModels) && map(inputModels, (model) => <Input theme={theme} data={model} styleName={styleName} />)}
        </div>
        <div class={cx('actions')}>
          <Button
            value={submitText}
            classed={cx(submitClassName, shownDisable ? 'disabled' : null)}
            onClick={() => onSubmit(inputModels, setExecutedState)}
          />
        </div>
      </div>
      {macroComponent
        ? createElement(macroComponent, {
            theme,
            parameters: { data: inputModels, setExecutedState, executedState },
          })
        : null}
    </Fragment>
  );
};

export default WidgetFactory.Register(
  'input_fields',
  'Input fields',
  InputFieldsWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
