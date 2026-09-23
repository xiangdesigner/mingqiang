"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "./PageTransition";

type Props = ComponentProps<typeof Link> & { href: string };

/** next/link that routes internal clicks through the boundary transition. */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const { navigate } = usePageTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const external = /^(https?:|mailto:|tel:)/.test(href);
    const hash = href.startsWith("#") || href.includes("#");
    const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (external || hash || modified || rest.target === "_blank") return;
    e.preventDefault();
    navigate(href);
  };
  return <Link href={href} onClick={handle} {...rest} />;
}
