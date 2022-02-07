import { Spinner } from "reactstrap";

export const Loader = ({ type = "border" }) => {
  return (
    <Spinner color="secondary" type={type}>
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
