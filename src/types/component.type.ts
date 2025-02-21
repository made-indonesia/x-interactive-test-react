import React from "react";

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BoxOwnProps>;

export type Box<DefaultProps> = <E extends React.ElementType = "div">(
  props: BoxProps<E> & DefaultProps,
) => React.ReactElement | React.ReactNode | null;

export type BoxRF<T> = BoxOwnProps & T;
