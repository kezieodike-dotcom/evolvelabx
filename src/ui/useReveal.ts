import { useEffect, useRef } from 'react';

export function useReveal(contentKey: string) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    function setup() {
      observer?.disconnect();
      element!.removeAttribute('data-reveal-ready');
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
      for (const target of element!.querySelectorAll('[data-reveal]:not(.is-visible)')) observer.observe(target);
      element!.setAttribute('data-reveal-ready', '');
    }
    setup();
    preference.addEventListener('change', setup);
    return () => {
      observer?.disconnect();
      element.removeAttribute('data-reveal-ready');
      preference.removeEventListener('change', setup);
    };
  }, [contentKey]);
  return root;
}
