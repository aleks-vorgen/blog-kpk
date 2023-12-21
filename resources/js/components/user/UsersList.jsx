import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteModal from "../shared/DeleteModal";
import CreateEditUserModal from "./CreateEditUserModal";
import TableCustom from "../shared/TableCustom";
import { useState } from "react";

const rows = [1, 2, 3, 4, 5];

const rowsHead = ["#", "ID", "Name", "Login", "Password", "Image", "Tools"];

const info = ["Stas", "stas@gmail.com", "12345", "image"];

export default function UsersList() {
    const [isCreationUserModalOpen, setIsCreationUserModalOpen] =
        useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

    const onCreationUserModalOpen = () => {
        setIsCreationUserModalOpen(() => true);
    };

    const onCreationUserModalClose = () => {
        setIsCreationUserModalOpen(() => false);
    };

    const onEditUserModalOpen = () => {
        setIsEditUserModalOpen(() => true);
    };

    const onEditUserModalClose = () => {
        setIsEditUserModalOpen(() => false);
    };

    const onDeleteUserModalOpen = () => {
        setIsDeleteUserModalOpen(() => true);
    };

    const onDeleteUserModalClose = () => {
        setIsDeleteUserModalOpen(() => false);
    };

    return (
        <>
            <TableCustom
                rows={rows}
                rowsHead={rowsHead}
                info={info}
                onDelete={onDeleteUserModalOpen}
                onEdit={onEditUserModalOpen}
            />
            <Tooltip title="Add new post" placement="top">
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
            />
            <CreateEditUserModal
                open={isEditUserModalOpen}
                onClose={onEditUserModalClose}
                // user={user}
            />
            <DeleteModal
                open={isDeleteUserModalOpen}
                onClose={onDeleteUserModalClose}
                // onDelete={onDeleteHandler}
                title={`Delete user?`}
                description={`Do you want to delete this user?`}
            />
        </>
    );
}
