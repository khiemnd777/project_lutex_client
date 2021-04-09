import { PropRef, useEffect } from 'preact/hooks';

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

export const onSticky = (ref: PropRef<any>, stateHandler: (sticked: boolean) => void) => {
  let domRect: DOMRect;
  useEffect(() => {
    if (ref?.current) {
      domRect = ref.current.getBoundingClientRect();
    }
    const listener = () => {
      if (domRect) {
        stateHandler(window.pageYOffset >= domRect.top);
      }
    };
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [ref.current, stateHandler]);
};
