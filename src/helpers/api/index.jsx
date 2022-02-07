import _axios from "axios";
import { wrapPromiseWithLoader } from "../utils";

const axios = _axios.create({
  baseURL:
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiSuccess = (res) => {
  return res.data;
};

const handleApiError = (err) => {
  let errorMessagge = "";

  // request was manually cancelled in a `useEffect` hook
  if (_axios.isCancel(err)) {
    return; // fail silently
  }

  if (err.response) {
    const apiError = err.response.data;
    // client received an error response (5xx, 4xx)
    console.error(
      `Backend returned code ${err.code}:${apiError.code}, ` +
        `body was: ${apiError.message}`,
      "data:",
      apiError.data
    );
    errorMessagge = apiError.message;
  } else if (err.request) {
    // client never received a response, or request never left
    console.error("An error occurred:", err.message);
  } else {
    // anything else
    console.error("Well, that was unexpected:", err.message);
  }

  throw Error(
    errorMessagge ||
      "We couldn't complete your request. Please try again or check your internet connection."
  );
};

export const Api = {
  get: (endpoint: string, config) =>
    axios.get(endpoint, config).then(handleApiSuccess).catch(handleApiError),
  post: (endpoint: string, data: any, config) =>
    wrapPromiseWithLoader(
      axios
        .post(endpoint, data, config)
        .then(handleApiSuccess)
        .catch(handleApiError)
    ),
  put: (endpoint: string, data: any, config) =>
    wrapPromiseWithLoader(
      axios
        .put(endpoint, data, config)
        .then(handleApiSuccess)
        .catch(handleApiError)
    ),
  delete: (endpoint: string, config) =>
    wrapPromiseWithLoader(
      axios
        .delete(endpoint, config)
        .then(handleApiSuccess)
        .catch(handleApiError)
    ),
};
