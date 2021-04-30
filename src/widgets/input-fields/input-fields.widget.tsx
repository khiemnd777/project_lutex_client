import { map, size } from 'lodash-es';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { MacroFactory } from '_stdio/core/macros/macro-factory';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import Button from '_stdio/shared/components/button/button';
import Input from '_stdio/shared/components/input/input';
import { ValidateInputs } from '_stdio/shared/components/input/input-factory';
import InputModel from '_stdio/shared/components/input/input-model';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { InputFieldWidgetArgs } from './input-fields-interfaces';

const onSubmit = (
  data: InputModel[],
  setIsSubmit: StateUpdater<boolean>,
  setSending: StateUpdater<boolean>,
  setSent: StateUpdater<boolean>
) => {
  setIsSubmit(true);
  setSent(false);
  if (ValidateInputs(data)) {
    setSending(true);
    console.log('inputs have been valid');
    // Move to the macro
    SendContactViaInputs()
      .then(() => {
        setSending(false);
        setSent(true);
      })
      .catch((error) => console.log(error));
    return;
  }
};

// Move to the macro
const SendContactViaInputs = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

const InputFieldsWidget: FunctionalComponent<InputFieldWidgetArgs> = ({ theme, data, parameters }) => {
  const cx = BuildClassNameBind(theme.Name, 'input_fields');
  // consume macro.
  const macroName = GetParameterValue('macro', parameters);
  const macroComponent = MacroFactory.Get(macroName);
  const [isSubmit, setIsSubmit] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const inputModelsParsed = map(data, (inputField) => {
    return {
      title: inputField.Title,
      name: inputField.Name,
      required: inputField.Required,
      type: inputField.Type,
      val: inputField.DefaultValue,
    } as InputModel;
  });
  const [inputModels, setInputModels] = useState<InputModel[]>(() => inputModelsParsed);
  if (!size(inputModels) && size(data)) {
    setInputModels(inputModelsParsed);
  }
  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false);
    }
  }, [isSubmit]);
  return (
    <Fragment>
      <div class={cx('input_fields', size(data) ? 'visible' : null)}>
        <div class={cx('fields', sending ? 'disabled' : null)}>
          {(!!isSubmit || !!size(inputModels)) && map(inputModels, (model) => <Input data={model} />)}
        </div>
        <div class={cx('actions')}>
          <Button
            value="Submit"
            classed={cx('submit', sending ? 'disabled' : null)}
            onClick={() => onSubmit(inputModels, setIsSubmit, setSending, setSent)}
          />
        </div>
      </div>
      {macroComponent
        ? createElement(macroComponent, {
            theme,
            parameters: { data: inputModels, submitted: isSubmit, setSending, setSent },
          })
        : null}
      <div class={cx('message_info', sent ? 'visible' : null)} onClick={() => setSent(false)}>
        <div class={cx('overlay')}></div>
        <span>Your enquiry was sent!</span>
      </div>
    </Fragment>
  );
};

export default WidgetFactory.Register('input_fields', 'Input fields', InputFieldsWidget);
