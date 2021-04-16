import { PropRef, useEffect } from 'preact/hooks';
import publicIp from 'public-ip';

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

export const useDelay = (handler: (onTime: boolean) => void, timeout: number) => {
  useEffect(() => {
    window.setTimeout(() => {
      handler(true);
    }, timeout);
  }, []);
};

export const useInterval = (handler: (onTime: boolean) => void, interval: number) => {
  useEffect(() => {
    window.setInterval(() => {
      handler(true);
    }, interval);
  }, []);
};

export const useIpv6 = (handler: (ipv6: string) => void) => {
  useEffect(() => {
    void publicIp.v6().then((ipv6) => {
      handler(ipv6);
    });
  }, []);
};

export const useIpv4 = (handler: (ipv4: string) => void) => {
  useEffect(() => {
    void publicIp.v4().then((ipv4) => {
      handler(ipv4);
    });
  });
};
