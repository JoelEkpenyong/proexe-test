import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import UserForm from "../../components/UserForm";
import { createUser } from "../../services/user";

const AddUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation((payload) => createUser(payload), {
    onSuccess: (res) => {
      // This whole contraption is because the API is a test api which doesn't really delete the resource, and I'm required to update that on the client side.
      queryClient.setQueryData("allUsers", (oldData) => {
        return [...oldData, { ...res, id: oldData.length + 1 }];
      });
    },
  });

  return (
    <section className="pt-4 px-2">
      <header className="d-flex justify-content-between align-items-center">
        <h1>Create User</h1>
        <Link to="/" className="btn btn-outline-secondary">
          Cancel
        </Link>
      </header>

      <div className="my-2 my-lg-4">
        <UserForm handleSubmit={mutateAsync} />
      </div>
    </section>
  );
};

export default AddUser;
