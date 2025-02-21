import * as React from "react";

import {cn} from "@/lib/utils.lib";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "type"> & {error?: boolean}
>(({className, error, ...props}, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "w-5 h-5 text-blue-600 bg-base-white border-2 border-gray-200 rounded",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-error-danger-500 focus-visible:border-gray-300",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Checkbox.displayName = "Checkbox";

export default Checkbox;
