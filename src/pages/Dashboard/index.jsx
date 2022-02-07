import React from "react";
import { useQuery } from "react-query";
import { FullPageLoader } from "../../components/Loader";
import UserTable from "../../components/UserTable";
import { getUsers } from "../../services/user";

const Dashboard = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery(
    "allUsers",
    getUsers
  );

  return (
    <div className="pt-lg-4">
      <h1>Dashboard</h1>

      {isLoading && <FullPageLoader />}

      {isError && (
        <div>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      )}

      {isSuccess && <UserTable tableData={data} />}
    </div>
  );
};

export default Dashboard;
