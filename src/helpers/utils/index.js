import { toast } from "react-toastify";

export const wrapPromiseWithLoader = (promiseFn) => {
  return toast.promise(promiseFn, {
    pending: "Hold on",
    success: {
      render({ data }: any) {
        return data?.message || "Operation successful";
      },
    },
    error: {
      render({ data }: any) {
        return typeof data === "string"
          ? data
          : data?.message || "Operation failed";
      },
    },
  });
};
