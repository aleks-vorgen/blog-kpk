import DeleteModal from "../shared/DeleteModal";
import CreateEditUserModal from "./CreateEditUserModal";
import TableCustom from "../shared/TableCustom";
import { useEffect, useState } from "react";
import {
    deleteUser,
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
                setUsers(users.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onCreationUserModalClose = () => {
        setIsCreationUserModalOpen(false);
    };

    const onEditUserModalOpen = (userId) => {
        getUser(userId)
            .then((user) => {
                setCurrentUser(user.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsEditUserModalOpen(true);
    };

    const onEditUserModalClose = async () => {
        setIsEditUserModalOpen(false);

        if (currentUser) {
            try {
                const updatedUser = await getUser(currentUser.id);
                setUsers((prev) =>
                    prev.map((item) =>
                        item.id !== updatedUser.data.id
                            ? item
                            : updatedUser.data
                    )
                );
            } catch (error) {
                console.log(error);
            }
        }

        setCurrentUser(null);
    };

    const onDeleteUserModalOpen = (userId) => {
        setDeletedUserId(userId);
        setIsDeleteUserModalOpen(true);
    };

    const onDeleteUserModalClose = () => {
        setIsDeleteUserModalOpen(false);
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
