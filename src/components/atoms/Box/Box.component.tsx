import * as React from "react";

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BoxOwnProps>;

const defaultElement = "div";

const Raw = React.forwardRef(function Box(
  props: BoxOwnProps,
  ref: React.Ref<Element>,
) {
  const Element = props.as || defaultElement;
  return <Element ref={ref} {...props} as={undefined} />;
});
Raw.displayName = "Raw";

const Box: <E extends React.ElementType = typeof defaultElement>(
  props: BoxProps<E>,
) => React.ReactElement | React.ReactNode | null = Raw;

export default Box;
