import { Spinner } from "reactstrap";

export const Loader = ({ type = "border", color = "secondary", size }) => {
  return (
    <Spinner color={color} type={type} size={size}>
      Loading...
    </Spinner>
  );
};

export const FullPageLoader = () => {
  return (
    <div
      className="full-page-loader d-flex justify-content-center align-items-center w-100"
      style={{ height: "50vh" }}
    >
      <Loader type="grow" />
    </div>
  );
};
