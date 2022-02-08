import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import UserForm from "../../components/UserForm";
import { getUsers, updateUser } from "../../services/user";

const EditUser = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [singleUser, setSingleUser] = useState({});
  const { data: users } = useQuery("allUsers", getUsers);

  useEffect(() => {
    const user = users?.find((user) => user.id === +params.id);

    setSingleUser(user);
  }, [params.id, queryClient, singleUser, users]);

  const { mutateAsync } = useMutation(
    (payload) => updateUser(params.id, payload),
    {
      onSuccess: (_, args) => {
        // This whole contraption is because the API is a test api which doesn't really delete the resource, and I'm required to update that on the client side.
        queryClient.setQueryData("allUsers", (oldData) => {
          let userIndex = oldData.findIndex((user) => user.id === args.id);
          let newData = [...oldData];
          newData.splice(userIndex, 1, args);

          return newData;
        });
      },
    }
  );

  return (
    <section className="pt-4 px-2">
      <header className="d-flex justify-content-between align-items-center">
        <h1>Edit User</h1>
        <Link to="/" className="btn btn-outline-secondary">
          Cancel
        </Link>
      </header>

      <div className="my-2 my-lg-4">
        <UserForm handleSubmit={mutateAsync} defaultValues={singleUser} />
      </div>
    </section>
  );
};

export default EditUser;
