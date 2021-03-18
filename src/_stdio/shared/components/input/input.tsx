import classNamesBind from 'classnames/bind';
import { FunctionComponent, h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';
import slugify from 'slugify';
import { isNullOrUndefined } from '_stdio/shared/utils/object.utils';
import InputModel from './input-model';
import styles from './input.styled.scss';

const cx = classNamesBind.bind(styles);

interface InputArgs {
  data: InputModel;
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

const Input: FunctionComponent<InputArgs> = ({ data, ...props }) => {
  const [val, setVal] = useState(data.val);
  let { type, name, title, required, valid } = data;
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
      <label class={cx('title')}>
        {title}
        {!!required ? <span class={cx('required')}>*</span> : null}
      </label>
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
