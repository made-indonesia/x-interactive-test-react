import {cn} from "@/lib/utils.lib";
import {Box, BoxRF} from "@/types/component.type";
import {cva, VariantProps} from "class-variance-authority";
import React, {forwardRef} from "react";

export const bodyVariants = cva("font-satoshi", {
  defaultVariants: {
    variant: "md",
    weight: "regular",
  },
  variants: {
    variant: {
      inherit: "",
      lg: "text-lg leading-lg",
      md: "text-md leading-md",
      sm: "text-sm leading-sm",
      xl: "text-xl leading-xl",
      xs: "text-xs leading-xs",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
      regular: "font-normal",
      semibold: "font-semibold",
    },
  },
});

export interface BodyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bodyVariants> {}

const PrimitiveBody = forwardRef<Element, BoxRF<BodyProps>>((props, ref) => {
  const {
    as: Element = "p",
    children,
    className,
    variant,
    weight,
    ...restProps
  } = props;

  return (
    <Element
      className={cn(bodyVariants({className, variant, weight}))}
      ref={ref}
      {...restProps}>
      {children}
    </Element>
  );
});
PrimitiveBody.displayName = "Body";

const Body: Box<BodyProps> = PrimitiveBody;

export default Body;
