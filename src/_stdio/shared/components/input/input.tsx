import classNamesBind from 'classnames/bind';
import { FunctionComponent, h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';
import slugify from 'slugify';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { isNullOrUndefined } from '_stdio/shared/utils/object.utils';
import InputModel from './input-model';
import styles from './input.styled.scss';

interface InputArgs {
  data: InputModel;
  theme?: ThemeType;
  styleName?: string;
  onInput?: h.JSX.TargetedEvent<HTMLInputElement, Event>;
}

const onInput = (
  e: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  data: InputModel,
  setVal: StateUpdater<string | undefined>
) => {
  const { value } = e.currentTarget;
  data.val = value;
  setVal(value);
};

const onTextAreaInput = (
  e: h.JSX.TargetedEvent<HTMLTextAreaElement, Event>,
  data: InputModel,
  setVal: StateUpdater<string | undefined>
) => {
  const { value } = e.currentTarget;
  data.val = value;
  setVal(value);
};

const Input: FunctionComponent<InputArgs> = ({ theme, data, styleName }) => {
  const cx = theme && styleName ? BuildClassNameBind(theme.Name, styleName) : classNamesBind.bind(styles);
  const [val, setVal] = useState(data.val);
  let { type, name, title, required, valid, visibleTitle } = data;
  type = !type ? 'text' : type;
  name = !name
    ? slugify(title, {
        lower: true,
      })
    : name;
  // set to name if empty
  if (!data?.name) {
    data.name = name;
  }
  // set to type if empty
  if (!data?.type) {
    data.type = type;
  }
  return (
    <div class={cx('form_field')}>
      {visibleTitle ? (
        <label class={cx('title')}>
          {title}
          {!!required ? <span class={cx('required')}>*</span> : null}
        </label>
      ) : null}

      <div class={cx('field')}>
        {type === 'longtext' ? (
          <textarea
            name={name}
            id={name}
            class={cx('longtext', !isNullOrUndefined(valid) && !valid ? 'error' : null)}
            placeholder={!isNullOrUndefined(valid) && !valid ? `Please input the ${title} field.` : ''}
            onInput={(e) => onTextAreaInput(e, data, setVal)}
          >
            {val}
          </textarea>
        ) : type === 'password' ? (
          <input
            name={name}
            type="password"
            id={name}
            class={cx('text', !isNullOrUndefined(valid) && !valid ? 'error' : null)}
            value={val}
            placeholder={!isNullOrUndefined(valid) && !valid ? `Please input the ${title} field.` : ''}
            onInput={(e) => onInput(e, data, setVal)}
          />
        ) : (
          <input
            name={name}
            id={name}
            class={cx('text', !isNullOrUndefined(valid) && !valid ? 'error' : null)}
            value={val}
            placeholder={!isNullOrUndefined(valid) && !valid ? `Please input the ${title} field.` : ''}
            onInput={(e) => onInput(e, data, setVal)}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
