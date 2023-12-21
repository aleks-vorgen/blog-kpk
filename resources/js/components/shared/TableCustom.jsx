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

export default function TableCustom({ rows, rowsHead, info, onDelete, onEdit }) {
    return (
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
                            {info.map((data) => (
                                <StyledTableCell align="left" key={data}>
                                    {data}
                                </StyledTableCell>
                            ))}

                            <StyledTableCell align="left">
                                <Tooltip title="Delete" placement="top">
                                    <IconButton onClick={onDelete}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit" placement="top">
                                    <IconButton onClick={onEdit}>
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
