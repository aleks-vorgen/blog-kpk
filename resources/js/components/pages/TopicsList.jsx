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
import { CreateEditTopic } from "../modals/CreateEditTopic";
import { DeleteModal } from "../modals/DeleteModal";
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

const rowsHead = ["#", "ID", "Name", "Tools"];

export default function TopicsList() {
    const [isCreationTopicModalOpen, setIsCreationTopicModalOpen] =
        useState(false);
    const [isEditTopicModalOpen, setIsEditTopicModalOpen] = useState(false);
    const [isDeleteTopicModalOpen, setIsDeleteTopicModalOpen] = useState(false);

    const onCreationTopicModalOpen = () => {
        setIsCreationTopicModalOpen(() => true);
    };

    const onCreationTopicModalClose = () => {
        setIsCreationTopicModalOpen(() => false);
    };

    const onEditTopicModalOpen = () => {
        setIsEditTopicModalOpen(() => true);
    };

    const onEditTopicModalClose = () => {
        setIsEditTopicModalOpen(() => false);
    };

    const onDeleteTopicModalOpen = () => {
        setIsDeleteTopicModalOpen(() => true);
    };

    const onDeleteTopicModalClose = () => {
        setIsDeleteTopicModalOpen(() => false);
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
                                    Biathlon
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Tooltip title="Delete" placement="top">
                                        <IconButton
                                            onClick={onDeleteTopicModalOpen}
                                        >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton
                                            onClick={onEditTopicModalOpen}
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
                    onClick={onCreationTopicModalOpen}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <CreateEditTopic
                open={isCreationTopicModalOpen}
                onClose={onCreationTopicModalClose}
            />
            <CreateEditTopic
                open={isEditTopicModalOpen}
                onClose={onEditTopicModalClose}
                // topic={topic}
            />
            <DeleteModal
                open={isDeleteTopicModalOpen}
                onClose={onDeleteTopicModalClose}
                // onDelete={onDeleteHandler}
                title={`Delete topic?`}
                description={`Do you want to delete this topic?`}
            />
        </>
    );
}
