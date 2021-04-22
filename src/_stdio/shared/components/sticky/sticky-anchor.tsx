import classNamesBind from 'classnames/bind';
import { FunctionalComponent, h } from 'preact';
import { PropRef, useEffect, useRef, useState } from 'preact/hooks';
import styles from './sticky-anchor.styled.scss';

const cx = classNamesBind.bind(styles);

interface StickyAnchorArgs {
  paddingBottom?: number;
  stickyRef: PropRef<any>;
  handler: (sticky: boolean) => void;
}

const StickyAnchor: FunctionalComponent<StickyAnchorArgs> = ({ paddingBottom, stickyRef, handler }) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [stickyRecorded, setStickyRecorded] = useState(false);
  useEffect(() => {
    const listener = () => {
      const anchorDomRect = anchorRef.current.getBoundingClientRect();
      const sticky = anchorDomRect.top - (paddingBottom ? paddingBottom : 0) <= 0;
      if (stickyRecorded !== sticky) {
        handler(sticky);
        setStickyRecorded(sticky);
      }
    };
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [stickyRef.current, anchorRef.current, stickyRecorded]);
  return <div ref={anchorRef} class={cx('sticky_anchor')}></div>;
};

export default StickyAnchor;
