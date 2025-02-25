// hooks/useErrorToast.ts
import {toast} from "react-toastify";

export const useErrorToast = () => {
  const showError = (
    error: unknown,
    defaultMessage = "Something went wrong!",
  ) => {
    const message =
      typeof error === "string"
        ? error
        : error instanceof Error
        ? error.message
        : defaultMessage;

    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return {showError};
};
