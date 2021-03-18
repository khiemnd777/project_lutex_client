import styles from './scroll-top.styled.scss';
import arrowStyles from '../../../scss/_arrow.scss';
import { useOnScrollGlobally } from '_stdio/shared/utils/hooks';
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import classNamesBind from 'classnames/bind';
import { scrollFunction, scrollToTop } from './scroll-top-action';

const cx = classNamesBind.bind(styles);
const arrowCx = classNamesBind.bind(arrowStyles);

const ScrollTop = () => {
  const refDom = useRef<HTMLDivElement>(null);

  useOnScrollGlobally((evt) => scrollFunction(refDom?.current, evt));
  return (
    <div ref={refDom} class={cx('scroll_top')} onClick={() => scrollToTop(500)}>
      <div class={cx('content')}>
        <i class={arrowCx('arrow', 'up', 'dark')} />
      </div>
    </div>
  );
};

export default ScrollTop;
