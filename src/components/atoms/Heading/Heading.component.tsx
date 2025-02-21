import {cn} from "@/lib/utils.lib";
import {Box, BoxRF} from "@/types/component.type";
import {cva, VariantProps} from "class-variance-authority";
import React, {forwardRef} from "react";

const headingVariants = cva("font-satoshi", {
  defaultVariants: {
    variant: "h1",
    weight: "regular",
  },
  variants: {
    variant: {
      h1: "text-h1 leading-h1",
      h2: "text-h2 leading-h2",
      h3: "text-h6 leading-h6 md:text-h4 md:leading-h-4 lg:text-h3 lg:leading-h3",
      h4: "text-h4 leading-h4",
      h5: "text-h5 leading-h5",
      h6: "text-h6 leading-h6",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
      regular: "font-normal",
      semibold: "font-bold",
    },
  },
});

export interface HeadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof headingVariants> {}

const PrimitiveHeading = forwardRef<Element, BoxRF<HeadingProps>>(
  (props, ref) => {
    const {
      as: Element = "h1",
      children,
      className,
      variant,
      weight,
      ...restProps
    } = props;

    return (
      <Element
        className={cn(headingVariants({className, variant, weight}))}
        ref={ref}
        {...restProps}>
        {children}
      </Element>
    );
  },
);
PrimitiveHeading.displayName = "Heading";

const Heading: Box<HeadingProps> = PrimitiveHeading;

export default Heading;
