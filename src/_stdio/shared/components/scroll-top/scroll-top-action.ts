import styles from './scroll-top.styled.scss';
import classNamesBind from 'classnames/bind';

const cx = classNamesBind.bind(styles);

export const scrollToTop = (duration: number) => {
  // cancel if already on top
  const scrollElm = document?.scrollingElement;
  if (!scrollElm) return;
  const scrollTop = scrollElm?.scrollTop;
  if (!scrollTop) return;
  const cosParameter = scrollTop / 2;
  let scrollCount = 0;
  let oldTimestamp: number;

  const step = (newTimestamp: number) => {
    if (!!oldTimestamp) {
      // if duration is 0 scrollCount will be Infinity
      scrollCount += (Math.PI * (newTimestamp - oldTimestamp)) / duration;
      if (scrollCount >= Math.PI) return (scrollElm.scrollTop = 0);
      scrollElm.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
};

export const scrollFunction = (elm: HTMLDivElement, evt: Event) => {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    elm.classList.add(cx('show'));
  } else {
    elm.classList.remove(cx('show'));
  }
};
