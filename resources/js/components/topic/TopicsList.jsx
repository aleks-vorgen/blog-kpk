import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateEditTopicModal from "./CreateEditTopicModal";
import DeleteModal from "../shared/DeleteModal";
import { useState } from "react";
import TableCustom from "../shared/TableCustom";

const rows = [1, 2, 3, 4, 5];

const rowsHead = ["#", "ID", "Name", "Tools"];

const info = ["Biathlon"];

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
            <TableCustom
                rows={rows}
                rowsHead={rowsHead}
                info={info}
                onDelete={onDeleteTopicModalOpen}
                onEdit={onEditTopicModalOpen}
            />
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
            <CreateEditTopicModal
                open={isCreationTopicModalOpen}
                onClose={onCreationTopicModalClose}
            />
            <CreateEditTopicModal
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
