import {extendTailwindMerge} from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-h5",
        "text-h6",
        "text-lg",
        "text-md",
        "text-sm",
        "text-xl",
        "text-xs",
      ],
      "shadow-color": ["text-shadow-*"],
    },
  },
});
