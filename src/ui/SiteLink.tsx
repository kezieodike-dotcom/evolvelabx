import type { AnchorHTMLAttributes } from 'react';

export function SiteLink({ to, children, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return <a href={to} {...props} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }}>{children}</a>;
}
