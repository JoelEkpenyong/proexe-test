import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const baseSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Valid email is required"),
  username: yup.string().required("Username is required"),
  address: yup.object({ city: yup.string().required("City is required") }),
  //   city: yup.string().required("City is required"),
});

export const UserSchema = baseSchema;
