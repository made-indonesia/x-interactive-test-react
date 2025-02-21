import * as React from "react";

import {cn} from "@/lib/utils.lib";

const Radio = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "type"> & {error?: boolean}
>(({className, error, ...props}, ref) => {
  return (
    <input
      type="radio"
      className={cn(
        "w-5 h-5 text-blue-600 border-4 border-gray-200 bg-gray-200 rounded-full ",
        "checked:border-primary-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-error-danger-500 focus-visible:border-gray-300",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Radio.displayName = "Radio";

export default Radio;
