import classNamesBind from 'classnames/bind';
import { FunctionalComponent, h } from 'preact';
import { PropRef, useEffect, useRef, useState } from 'preact/hooks';
import styles from './sticky-anchor.styled.scss';

const cx = classNamesBind.bind(styles);

interface StickyAnchorArgs {
  stickyRef: PropRef<any>;
  containerRef?: PropRef<any>;
  handler: (sticky: boolean) => void;
  paddingBottom?: number;
}

const StickyAnchor: FunctionalComponent<StickyAnchorArgs> = ({ paddingBottom, stickyRef, containerRef, handler }) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [stickyRecorded, setStickyRecorded] = useState(false);
  useEffect(() => {
    const listener = () => {
      const realPaddignBottom = paddingBottom ? paddingBottom : 0;
      const anchorDomRect = anchorRef.current.getBoundingClientRect();
      const sticky = anchorDomRect.top - realPaddignBottom <= 0;
      if (stickyRecorded !== sticky) {
        handler(sticky);
        setStickyRecorded(sticky);
      }
      // end-dom-rect
      const endDomRect = containerRef?.current
        ? (containerRef?.current as HTMLElement).getBoundingClientRect()
        : undefined;
      const stickyDom = stickyRef?.current as HTMLElement;
      const stickyDomRect = stickyDom ? stickyDom.getBoundingClientRect() : undefined;
      if (endDomRect && stickyDomRect) {
        if (endDomRect.bottom - stickyDomRect.height - realPaddignBottom <= 0) {
          stickyDom.style.top = `${endDomRect.bottom - stickyDomRect.height}px`;
        } else {
          stickyDom.style.top = '';
        }
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
