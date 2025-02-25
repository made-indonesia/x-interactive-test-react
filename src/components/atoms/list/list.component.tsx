import {cn} from "@/lib/utils.lib";
import {ReactNode} from "react";
import Box from "../Box";

interface ListProps {
  children: ReactNode;
  type?: "ol" | "ul";
}
const List = ({children, type = "ul"}: ListProps) => {
  return (
    <Box
      as="ul"
      className={cn(
        "list-none space-y-2",
        type === "ol" && "list-decimal",
        type === "ul" && "list-disc",
      )}
      aria-label="List">
      {children}
    </Box>
  );
};

export default List;
