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

export const onDelay = (handler: () => void, timeout: number) => {
  useEffect(() => {
    window.setTimeout(() => {
      handler();
    }, timeout);
  }, []);
};

export const onInterval = (handler: () => void, interval: number) => {
  useEffect(() => {
    window.setInterval(() => {
      handler();
    }, interval);
  }, []);
};
