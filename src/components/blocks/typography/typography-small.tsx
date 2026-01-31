import { DetailedHTMLProps, HTMLAttributes } from 'react';

export function TypographySmall({
  children,
}: { children: string } & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return <small className="text-sm leading-none font-medium">{children}</small>;
}
