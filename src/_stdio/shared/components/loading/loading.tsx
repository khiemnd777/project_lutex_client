import classNames from 'classnames/bind';
import { h, FunctionalComponent } from 'preact';
import { MathRound } from '_stdio/shared/utils/math.utils';
import styles from './loading.styled.scss';

const cx = classNames.bind(styles);

interface LoadingProps {
  message?: string;
  size?: number;
  fontSize?: string;
  bgColor?: string;
  fgColor?: string;
  hidden?: boolean;
}
const Loading: FunctionalComponent<LoadingProps> = ({ message, hidden }) => {
  return (
    <div class={cx('loading', hidden ? 'hidden' : null)}>
      {message ? <span>{message}</span> : null}
      <div class={cx('content')}>
        <div class={cx('logo')}></div>
      </div>
      <div class={cx('overlay')}></div>
    </div>
  );
};

export default Loading;
