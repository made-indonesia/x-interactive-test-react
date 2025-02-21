// import {toast} from "@/hooks/useToast.hook";
import axios from "axios";
import {clsx, type ClassValue} from "clsx";
import {twMerge} from "./twMerge.lib";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: number | string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const handleError = (e: any) => {
//   if (axios.isAxiosError(e)) {
//     toast({
//       description: e.response?.data.message ?? e.message,
//       toastType: "danger",
//     });
//   } else if (e instanceof Error) {
//     toast({
//       description: e.message,
//       toastType: "danger",
//     });
//   }
// };
