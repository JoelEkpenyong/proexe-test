import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "reactstrap";
import { toggleModal, toggleSort } from "../../redux/slices/ui";
import { deleteUser, getUsers } from "../../services/user";
import ConfirmModal from "../modals/ConfrimModal";
import { sortArray } from "../../helpers/utils";

const ActionDropdown = ({ onDelete, userId }) => {
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
          <Link
            to={`/user/${userId}/edit`}
            className="btn btn-small w-100 p-1 btn-secondary"
            style={{ fontSize: ".8rem" }}
          >
            Edit
          </Link>
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

const SorterDropdown = () => {
  const [actionsOpen, setActionOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: users, refetch } = useQuery("allUsers", getUsers);
  // const users = queryClient.getQueryData("allUsers");
  const dispatch = useDispatch();

  const {
    ui: { sort },
  } = useSelector((state) => state);

  const toggleDropdown = () => {
    setActionOpen(!actionsOpen);
  };

  const sortData = (property, direction) => {
    const sortedCopy = sortArray(users, property, direction);
    queryClient.setQueryData("allUsers", sortedCopy);
    dispatch(toggleSort({ name: property, direction }));
  };

  const unSortData = (property) => {
    refetch().then((res) => queryClient.setQueryData("allUsers", res?.data));
    dispatch(toggleSort({ name: property, direction: null }));
  };

  return (
    <Dropdown toggle={toggleDropdown} isOpen={actionsOpen}>
      <DropdownToggle className="text-dark bg-light border-0 p-0 m-o">
        &#8595; &#8593;
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          disabled={sort.username.order === null}
          onClick={() => unSortData("username")}
        >
          Un-sort
        </DropdownItem>
        <DropdownItem
          disabled={sort.username.order === "asc"}
          onClick={() => sortData("username", "asc")}
        >
          sort by ASC
        </DropdownItem>
        <DropdownItem
          disabled={sort.username.order === "desc"}
          onClick={() => sortData("username", "desc")}
        >
          sort by DESC
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
          <ActionDropdown
            userId={data.id}
            onDelete={() => mutateAsync(data.id)}
          />
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
            <th>
              <span className="d-inline-flex">
                <span className="me-1">Username</span>
                <SorterDropdown />
              </span>
            </th>
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
