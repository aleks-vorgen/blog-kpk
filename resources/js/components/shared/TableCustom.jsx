import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

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

export default function TableCustom({ info, onDelete, onEdit }) {
    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell component="th" scope="row">
                            #
                        </StyledTableCell>
                        {Object.keys(info[0]).map((cell, index) => (
                            <StyledTableCell align="left" key={cell+index}>
                                {cell}
                            </StyledTableCell>
                        ))}
                        <StyledTableCell component="th" scope="row">
                            tools
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {info.map((data, index) => (
                        <StyledTableRow key={data+index}>
                            <StyledTableCell component="th" scope="row">
                                {index + 1}
                            </StyledTableCell>
                            {Object.values(data).map((value, index) => (
                                <React.Fragment key={value+index}>
                                    <StyledTableCell align="left">
                                        {value}
                                    </StyledTableCell>
                                </React.Fragment>
                            ))}
                            <StyledTableCell align="left">
                                <Tooltip title="Delete" placement="top">
                                    <IconButton
                                        onClick={() => onDelete(data.id)}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit" placement="top">
                                    <IconButton onClick={() => onEdit(data.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
