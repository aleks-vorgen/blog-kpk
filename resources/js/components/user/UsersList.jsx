import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteModal from "../shared/DeleteModal";
import CreateEditUserModal from "./CreateEditUserModal";
import TableCustom from "../shared/TableCustom";
import { useEffect, useState } from "react";
import {
    deleteUser,
    editUser,
    getUser,
    getUsers,
} from "../services/UserService";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isCreationUserModalOpen, setIsCreationUserModalOpen] =
        useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
    const [deletedUserId, setDeletedUserId] = useState(null);

    useEffect(() => {
        getUsers()
            .then((users) => {
                setUsers(() => users.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onCreationUserModalOpen = () => {
        setIsCreationUserModalOpen(() => true);
    };

    const onCreationUserModalClose = () => {
        setIsCreationUserModalOpen(() => false);
    };

    const onEditUserModalOpen = (userId) => {
        getUser(userId)
            .then((user) => {
                setCurrentUser(() => user.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsEditUserModalOpen(() => true);
    };

    const onEditUserModalClose = () => {
        setIsEditUserModalOpen(() => false);
    };

    const onDeleteUserModalOpen = (userId) => {
        setDeletedUserId(userId);
        setIsDeleteUserModalOpen(() => true);
    };

    const onDeleteUserModalClose = () => {
        setIsDeleteUserModalOpen(() => false);
    };

    const onDeleteUser = () => {
        deleteUser(deletedUserId);
        setUsers((prev) => prev.filter((item) => item.id !== deletedUserId));
    };

    return (
        <>
            {users.length ? (
                <TableCustom
                    info={users}
                    onDelete={onDeleteUserModalOpen}
                    onEdit={onEditUserModalOpen}
                />
            ) : (
                <>empty</>
            )}

            <Tooltip title="Add new user" placement="top">
                <Fab
                    color="secondary"
                    sx={{
                        position: "fixed",
                        bottom: 30,
                        right: 30,
                    }}
                    onClick={onCreationUserModalOpen}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <CreateEditUserModal
                open={isCreationUserModalOpen}
                onClose={onCreationUserModalClose}
                setItems={setUsers}
            />
            <CreateEditUserModal
                open={isEditUserModalOpen}
                onClose={onEditUserModalClose}
                setItems={setUsers}
                user={currentUser}
            />
            <DeleteModal
                open={isDeleteUserModalOpen}
                onClose={onDeleteUserModalClose}
                onDelete={onDeleteUser}
                title={`Delete user?`}
                description={`Do you want to delete this user?`}
            />
        </>
    );
}
