import { isEmpty } from 'lodash-es';
import { PropRef, useEffect, useState } from 'preact/hooks';

export const useOnClickOutside = (ref: PropRef<any>, handler: (evt: MouseEvent) => void) => {
  useEffect(() => {
    const listener = (evt: MouseEvent) => {
      if (!ref.current || ref.current.contains(evt.target)) {
        return;
      }
      handler(evt);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export const useOnScrollGlobally = (handler: (evt: Event) => void) => {
  useEffect(() => {
    const listener = (evt: Event) => {
      handler(evt);
    };
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });
};

export const onSticky = (ref: PropRef<any>, handler: (sticked: boolean) => void) => {
  const [domRect, setDomRect] = useState({} as DOMRect);
  const [stickyRecorded, setStickyRecorded] = useState(false);
  useEffect(() => {
    if (ref?.current && isEmpty(domRect)) {
      setDomRect(ref.current.getBoundingClientRect());
    }
  }, [ref?.current]);

  useEffect(() => {
    const listener = () => {
      if (domRect) {
        const sticked = window.pageYOffset >= domRect.top;
        if (stickyRecorded !== sticked) {
          handler(sticked);
          setStickyRecorded(sticked)
        }
      }
    };
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [ref.current, handler]);
};
