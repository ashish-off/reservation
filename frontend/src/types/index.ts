import type { MouseEventHandler, ReactNode } from "react";

export interface NavbarLinkType {
  id: number;
  title: string;
  link: string;
}

export type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};
