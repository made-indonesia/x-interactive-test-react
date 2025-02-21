import * as React from "react";

import {cn} from "@/lib/utils.lib";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {error?: boolean}
>(({className, error, type, ...props}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full transition-colors px-3.5 py-3",
        "border border-solid border-gray-300 rounded-lg",
        "leading-sm font-normal text-md placeholder:text-gray-400 text-gray-900",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-500",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
        error &&
          "border-error-danger-500 focus-visible:border-gray-300 placeholder:text-error-danger-300 text-error-danger-500",
        className,
        type === "search" && "pl-12",
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;
