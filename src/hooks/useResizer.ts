import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export function useResizer<T extends HTMLElement>(cb?: () => void) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // callback function
  const onResize = useCallback(
    (target: T, entry: ResizeObserverEntry) => {
      if (target.offsetWidth && target.offsetHeight) {
        setWidth(entry.contentRect.width);
        setHeight(entry.contentRect.height);
      }

      if (cb) {
        return cb();
      }
    },
    [cb]
  );

  // lifecycle hook
  useLayoutEffect(() => {
    const element = ref?.current;

    if (!element) {
      return;
    }

    setWidth(element.offsetWidth);
    setHeight(element.offsetHeight);

    const observer = new ResizeObserver((entries) => {
      onResize(element, entries[0]);
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [onResize, ref]);

  return { ref, width, height };
}
