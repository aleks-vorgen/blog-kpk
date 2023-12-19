import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Fab, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DeleteModal } from "../modals/DeleteModal";
import { CreateEditUser } from "../modals/CreateEditUser";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const rows = [1, 2, 3, 4, 5];

const rowsHead = ["#", "ID", "Name", "Login", "Password", "Image", "Tools"];

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
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {rowsHead.map((cell, index) => (
                                <StyledTableCell align="left" key={index}>
                                    {cell}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row}>
                                <StyledTableCell component="th" scope="row">
                                    {row}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    Stas
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    stas@gmail.com
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    12345
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    image
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Tooltip title="Delete" placement="top">
                                        <IconButton
                                            onClick={onDeleteUserModalOpen}
                                        >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton
                                            onClick={onEditUserModalOpen}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
            <CreateEditUser
                open={isCreationUserModalOpen}
                onClose={onCreationUserModalClose}
            />
            <CreateEditUser
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
