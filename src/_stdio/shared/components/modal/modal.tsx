import { h, FunctionalComponent } from 'preact';
import styles from './modal.scss';
import classNames from 'classnames/bind';
import { map } from 'lodash-es';

const cx = classNames.bind(styles);
export interface ButtonProps {
  name: string;
  isPrimary?: boolean;
  className?: string;
}

interface ModalProps {
  width?: number;
  height?: number;
  title?: string;
  buttons?: (string | ButtonProps)[];
  cssClass?: string;
  onClickedButton?: (event: MouseEvent, buttonName: string) => void;
  disabled?: boolean;
  disabledPrimary?: boolean;
}

const Modal: FunctionalComponent<ModalProps> = ({
  width,
  height,
  children,
  title,
  buttons,
  cssClass,
  onClickedButton,
  disabled,
  disabledPrimary,
}) => {
  const defaultButtons: string[] = ['OK'];
  return (
    <div class={cx('modal-container')}>
      <div class={cx('modal', cssClass)} style={`width: ${width || 500}px; height: ${height || 500}px`}>
        <div class={cx('header')}>{title || ''}</div>
        <div class={cx('content')}>{children}</div>
        <div class={cx('footer')}>
          {map(buttons || defaultButtons, (button) => {
            const { name, isPrimary, className } =
              typeof button === 'string' ? { name: button, isPrimary: false, className: null } : button;
            return (
              <div
                class={cx(
                  'button',
                  { 'is-primary': isPrimary },
                  { btn_disabled: disabled || (isPrimary && disabledPrimary) },
                  className
                )}
                onClick={(e) => {
                  if (onClickedButton) {
                    isPrimary
                      ? !disabled && !disabledPrimary && isPrimary && onClickedButton(e, name)
                      : !disabled && onClickedButton(e, name);
                  }
                }}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Modal;
