"use client";

import {cn} from "@/lib/utils.lib";
import {Box, BoxRF} from "@/types/component.type";
import {cva, type VariantProps} from "class-variance-authority";

import React, {forwardRef, ReactNode} from "react";

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 border border-solid rounded-full focus-visible:outline-none focus-visible:ring-2 font-satoshi whitespace-nowrap transition-colors disabled:pointer-events-none",
  {
    defaultVariants: {
      font: "sm",
      size: "md",
      variant: "primary",
    },
    variants: {
      font: {
        md: "text-md leading-md font-medium",
        sm: "text-sm leading-sm font-medium",
      },
      size: {
        "icon-lg": "p-3",
        "icon-md": "p-2.5",
        "icon-sm": "p-2",
        "icon-xl": "p-3",
        lg: "px-4 py-2.5",
        link: "p-0",
        md: "px-4 py-2.5",
        sm: "px-3.5 py-2",
        xl: "px-4 py-3",
      },
      variant: {
        danger:
          "bg-error-danger-500 border-error-danger-500 text-base-white hover:bg-error-danger-600 hover:border-error-danger-600 ring-error-danger-100",
        "link-color":
          "border-transparent bg-transparent text-primary-500 hover:text-primary-700",
        "link-gray":
          "border-transparent bg-transparent text-gray-600 hover:text-gray-800",
        "outline-color":
          "bg-transparent border-primary-500 hover:bg-primary-50 text-primary-500 ring-neutral-100",
        "outline-gray":
          "bg-transparent  border-gray-300 hover:bg-primary-50 text-gray-800 ring-neutral-100  disabled:text-gray-300 disabled:border-gray-200",
        primary:
          "bg-primary-500 border-primary-500 text-base-white hover:bg-primary-600 hover:border-primary-600 ring-primary-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200",
        secondary:
          "bg-primary-50 border-primary-50 text-primary-500 hover:bg-primary-100 hover:border-primary-100 ring-primary-100",
        "secondary-danger":
          "bg-error-danger-50 border-error-danger-50 text-error-danger-500 hover:bg-error-danger-100 hover:border-error-danger-100 ring-error-danger-100",
        "secondary-secondary":
          "bg-secondary-50 border-secondary-50 text-secondary-600 hover:bg-secondary-100 hover:border-secondary-100 ring-secondary-100",
        tertiary:
          "bg-warning-500 border-warning-500 text-base-white hover:bg-warning-600 hover:border-warning-600 ring-warning-100",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  endIcon?: ReactNode;
  startIcon?: ReactNode;
}

const PrimitiveButton = forwardRef<Element, BoxRF<ButtonProps>>(
  (props, ref) => {
    const {
      as: Element = "button",
      children,
      className,
      endIcon,
      font,
      size,
      startIcon,
      variant,
      ...restProps
    } = props;

    return (
      <Element
        className={cn(buttonVariants({className, font, size, variant}))}
        ref={ref}
        {...restProps}>
        {startIcon}
        {children}
        {endIcon}
      </Element>
    );
  },
);
PrimitiveButton.displayName = "Button";

/** Primary UI component for user interaction */
const Button: Box<ButtonProps> = PrimitiveButton;

export {Button, buttonVariants};

export default Button;
