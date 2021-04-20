import { PropRef, useEffect, useState } from 'preact/hooks';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { FetchResult, MutationFunctionOptions, MutationTuple, OperationVariables } from '@apollo/client';

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
    const delay = window.setTimeout(() => {
      handler(true);
    }, timeout);
    return () => {
      clearTimeout(delay);
    };
  }, []);
};

export const useInterval = (handler: (onTime: boolean) => void, interval: number) => {
  useEffect(() => {
    const time = window.setInterval(() => {
      handler(true);
    }, interval);
    return () => {
      clearInterval(time);
    };
  }, []);
};

export const useVisitorId = (handler: (visitorId: string) => void) => {
  useEffect(() => {
    // Initialize an agent at application startup.
    void FingerprintJS.load()
      .then((fp) => {
        // Get the visitor identifier when you need it.
        return fp.get();
      })
      .then((result) => {
        // This is the visitor identifier:
        const visitorId = result.visitorId;
        handler(visitorId);
      });
  }, []);
};

export const useOnceAction = <T = any>(
  actionHandler: () => MutationTuple<T, OperationVariables>,
  funcHandler: (
    func: (
      options?: MutationFunctionOptions<T, OperationVariables> | undefined
    ) => Promise<FetchResult<T, Record<string, any>, Record<string, any>>>
  ) => boolean
) => {
  const [once, setOnce] = useState(false);
  const [func] = actionHandler();
  useEffect(() => {
    if (!once) {
      const funcResult = funcHandler(func);
      if (funcResult) {
        setOnce(funcResult);
      }
    }
  });
};
