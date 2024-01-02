import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateEditTopicModal from "./CreateEditTopicModal";
import DeleteModal from "../shared/DeleteModal";
import { useEffect, useState } from "react";
import TableCustom from "../shared/TableCustom";
import { deleteTopic, getTopic, getTopics } from "../services/TopicService";

export default function TopicsList() {
    const [topics, setTopics] = useState([]);
    const [isCreationTopicModalOpen, setIsCreationTopicModalOpen] =
        useState(false);
    const [isEditTopicModalOpen, setIsEditTopicModalOpen] = useState(false);
    const [isDeleteTopicModalOpen, setIsDeleteTopicModalOpen] = useState(false);
    const [deletedTopicId, setDeletedTopicId] = useState(null);
    const [currentTopic, setCurrentTopic] = useState(null);

    useEffect(() => {
        getTopics()
            .then((topics) => {
                setTopics(() => topics.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onCreationTopicModalOpen = () => {
        setIsCreationTopicModalOpen(() => true);
    };

    const onCreationTopicModalClose = () => {
        setIsCreationTopicModalOpen(() => false);
    };

    const onEditTopicModalOpen = (topicId) => {
        getTopic(topicId)
            .then((topic) => {
                setCurrentTopic(() => topic.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsEditTopicModalOpen(() => true);
    };

    const onEditTopicModalClose = () => {
        setIsEditTopicModalOpen(() => false);
    };

    const onDeleteTopicModalOpen = (topicId) => {
        setDeletedTopicId(topicId);
        setIsDeleteTopicModalOpen(() => true);
    };

    const onDeleteTopicModalClose = () => {
        setIsDeleteTopicModalOpen(() => false);
    };

    const onDeleteTopic = () => {
        deleteTopic(deletedTopicId);
        setTopics((prev) => prev.filter((item) => item.id !== deletedTopicId));
    };

    const onCreationTopicSuccess = (newTopic) => {
        setTopics((prev) => prev.concat(newTopic));
    };

    return (
        <>
            {topics.length ? (
                <TableCustom
                    info={topics}
                    onDelete={onDeleteTopicModalOpen}
                    onEdit={onEditTopicModalOpen}
                />
            ) : (
                <>empty</>
            )}

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
                onSuccess={onCreationTopicSuccess}
            />
            <CreateEditTopicModal
                open={isEditTopicModalOpen}
                onClose={onEditTopicModalClose}
                onSuccess={onCreationTopicSuccess}
                topic={currentTopic}
            />
            <DeleteModal
                open={isDeleteTopicModalOpen}
                onClose={onDeleteTopicModalClose}
                onDelete={onDeleteTopic}
                title={`Delete topic?`}
                description={`Do you want to delete this topic?`}
            />
        </>
    );
}
