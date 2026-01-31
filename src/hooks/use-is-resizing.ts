import { useLayoutEffect, useRef, useState } from 'react';

type Options = { delay?: number };

export function useIsResizing<T extends HTMLElement = HTMLDivElement>({
  delay = 200,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: number | null = null;

    const start = () => {
      setIsResizing(true);
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setIsResizing(false), delay);
    };

    const ro = new ResizeObserver(() => start());
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [delay]);

  return { ref, isResizing };
}
