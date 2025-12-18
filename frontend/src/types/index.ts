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

export interface QualitiyType {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface DishType {
  id: number;
  image: string;
  title: string;
  category: string;
}