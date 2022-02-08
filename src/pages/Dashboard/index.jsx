import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FullPageLoader } from "../../components/Loader";
import UserTable from "../../components/UserTable";
import { getUsers } from "../../services/user";

const Dashboard = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery(
    "allUsers",
    getUsers
  );

  return (
    <section className="pt-4 px-2">
      <header className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>
        <Link to="/user/create" className="btn btn-outline-secondary">
          Add user
        </Link>
      </header>

      {isLoading && <FullPageLoader />}

      {isError && (
        <div>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      )}

      {isSuccess && <UserTable tableData={data} />}
    </section>
  );
};

export default Dashboard;
