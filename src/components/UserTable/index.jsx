import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "reactstrap";
import { toggleModal } from "../../redux/slices/ui";
import { deleteUser } from "../../services/user";
import ConfirmModal from "../modals/ConfrimModal";

const DropdownBtns = ({ onDelete }) => {
  const [actionsOpen, setActionOpen] = useState(false);

  const toggleDropdown = () => {
    setActionOpen(!actionsOpen);
  };

  const dispatch = useDispatch();

  const openConfirmModal = () => {
    return dispatch(
      toggleModal({
        name: "confirmModal",
        props: {
          confirmText:
            "You are about to delete this user, are you sure you want to continue?",
          confirmBtnText: "Delete",
          confirmFunction: () =>
            onDelete().finally(() =>
              dispatch(toggleModal({ name: "confirmModal" }))
            ),
        },
      })
    );
  };

  return (
    <Dropdown size="sm" isOpen={actionsOpen} toggle={toggleDropdown}>
      <DropdownToggle className="bg-transparent border-0 text-secondary">
        ...
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem className="bg-transparent">
          <span
            className="btn btn-small w-100 p-1 btn-secondary"
            style={{ fontSize: ".8rem" }}
          >
            Edit
          </span>
        </DropdownItem>
        <DropdownItem className="bg-transparent" onClick={openConfirmModal}>
          <span
            className="btn btn-small w-100 p-1 btn-danger"
            style={{ fontSize: ".8rem" }}
          >
            Delete
          </span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const UserTable = ({ tableData }) => {
  const {
    ui: { modals },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation((id) => deleteUser(id), {
    onSuccess: (_, id) => {
      // This whole contraption is because the API is a test api which doesn't really delete the resource, and I'm required to delete that on the client side.
      queryClient.setQueryData("allUsers", (oldData) => {
        return oldData.filter((user) => user.id !== id);
      });
    },
  });

  const generateRows = () => {
    return tableData.map((data) => (
      <tr key={`${data.name}__${data.id}`}>
        <th scope="row">{data?.id}</th>
        <th>{data?.name}</th>
        <th>{data?.username}</th>
        <th>{data?.address?.city}</th>
        <th>{data?.email}</th>
        <th>
          <DropdownBtns onDelete={() => mutateAsync(data.id)} />
        </th>
      </tr>
    ));
  };

  return (
    <>
      <Table responsive hover className="my-2 my-lg-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>City</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-secondary">{generateRows()}</tbody>
      </Table>

      {/* confirm modal */}
      <ConfirmModal
        showModal={modals.confirmModal.isOpen}
        {...modals.confirmModal.props}
        toggle={() => dispatch(toggleModal({ name: "confirmModal" }))}
      />
    </>
  );
};

export default UserTable;
