import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { UserSchema } from "../../services/user/schema";
import { Loader } from "../Loader";

const UserForm = ({
  defaultValues = { name: "", email: "", username: "", address: { city: "" } },
  handleSubmit,
  buttonText = "Create",
}) => {
  const naviagte = useNavigate();

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: UserSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      handleSubmit(values).then(() => {
        setSubmitting(false);
        resetForm();
        naviagte("/");
      });
    },
  });

  return (
    <div className="mx-auto p-3" style={{ maxWidth: "600px" }}>
      <Form inline onSubmit={formik.handleSubmit}>
        <FormGroup className="mb-2 me-sm-2 mb-sm-3">
          <Label className="me-sm-2" for="name">
            Name
          </Label>
          <Input
            id="name"
            {...formik.getFieldProps("name")}
            valid={!Boolean(formik.errors?.name) && formik.touched.name}
            invalid={Boolean(formik.errors?.name) && formik.touched.name}
            placeholder="John Doe"
            type="text"
          />
          <FormFeedback>{formik.errors?.name}</FormFeedback>
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-3">
          <Label className="me-sm-2" for="email">
            Email
          </Label>
          <Input
            id="email"
            {...formik.getFieldProps("email")}
            placeholder="something@idk.cool"
            type="email"
            valid={!Boolean(formik.errors?.email) && formik.touched.email}
            invalid={Boolean(formik.errors?.email) && formik.touched.email}
          />
          <FormFeedback>{formik.errors?.email}</FormFeedback>
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-3">
          <Label className="me-sm-2" for="username">
            Username
          </Label>
          <Input
            id="username"
            {...formik.getFieldProps("username")}
            placeholder="johnDoe"
            type="text"
            valid={!Boolean(formik.errors?.username) && formik.touched.username}
            invalid={
              Boolean(formik.errors?.username) && formik.touched.username
            }
          />
          <FormFeedback>{formik.errors?.username}</FormFeedback>
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-3">
          <Label className="me-sm-2" for="city">
            City
          </Label>
          <Input
            id="city"
            {...formik.getFieldProps("address.city")}
            placeholder="LA"
            type="text"
            valid={
              !Boolean(formik.errors?.address?.city) &&
              formik.touched.address?.city
            }
            invalid={
              Boolean(formik.errors?.address?.city) &&
              formik.touched.address?.city
            }
          />
          <FormFeedback>{formik.errors?.address?.city}</FormFeedback>
        </FormGroup>
        <Button
          className="mt-3"
          disabled={!formik.dirty || formik.isSubmitting || !formik.isValid}
          type="submit"
        >
          {buttonText}{" "}
          {formik.isSubmitting && <Loader color="light" size="sm" />}
        </Button>
      </Form>
    </div>
  );
};

export default UserForm;
