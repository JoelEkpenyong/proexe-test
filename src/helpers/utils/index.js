import { toast } from "react-toastify";
import orderBy from "lodash/orderBy";

export const wrapPromiseWithLoader = (promiseFn) => {
  return toast.promise(promiseFn, {
    pending: "Hold on",
    success: {
      render({ data }) {
        return data?.message || "Operation successful";
      },
    },
    error: {
      render({ data }) {
        return typeof data === "string"
          ? data
          : data?.message || "Operation failed";
      },
    },
  });
};

export const sortArray = (arr, property, direction) => {
  // const copy = [...arr];

  // copy.sort((el_1, el_2) => (el_1[desc] > el_2[desc] ? 0 : -1));
  // return copy;
  return orderBy(arr, property, direction);
};

// export const sortByDescending = (arr, desc) => {
//   // const copy = [...arr];

//   // copy.sort((el_1, el_2) => (el_1[desc] > el_2[desc] ? -1 : 0));
//   // return copy;
// };
