import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Modal,
} from "@mui/material";
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import { createNote } from "../services/userServices";
import { TextField, ClickAwayListener, Button } from "@mui/material";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import AddAlertOutlined from "@mui/icons-material/AddAlertOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import { updateNote } from "../services/userServices";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: 115px;
  // width: 240px;
  box-shadow: none;
  background-color: ${(props) => props.bgcolor || "white"};
  width: ${(props) =>
    props.layoutType === "list"
      ? "800px"
      : "240px"}; // Adjust width based on layoutType
`;

const Container = styled(Box)`

  display: flex;
  flex-direction: column;
  margin: auto;

  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  border-color: #e0e0e0;
  width: 600px;
  border-radius: 8px;
  min-height: 30px;
  padding: 10px 15px;
  //   border: 1px solid black;
  background-color: ${(props) =>
    props.bgcolor || "white"}; // <-- Dynamic background color
  position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)', 
`;

const Note = ({ noteData, layoutType,onNoteUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  // start
  const [openModal, setOpenModal] = useState(false);

  const [editedNoteData, setEditedNoteData] = useState({
    title: noteData.title,
    description: noteData.description,
    color: noteData.color,
    is_archive: noteData.is_archive,
    is_trash: noteData.is_trash,
    reminder: noteData.reminder,
  });

  const handleOpenModal = () => {
    setEditedNoteData({
      title: noteData.title,
      description: noteData.description,
      color: noteData.color,
      is_archive: noteData.is_archive,
      is_trash: noteData.is_trash,
      reminder: noteData.reminder,
    });
    setOpenModal(true);
  };
  // const handleCloseModal = () => setOpenModal(false);

  const handleCloseModal = async () => {
    setOpenModal(false);

    // Update the note on server
    try {
      await updateNote(noteData.id, editedNoteData); // Call the API to update the note with its ID
      console.log("Note updated successfully");

      // Optionally trigger a callback to update the note in the parent component
      if (onNoteUpdate) {
        onNoteUpdate(noteData.id, editedNoteData);
      }
    } catch (error) {
      console.error("Failed to update note", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNoteData((prev) => ({ ...prev, [name]: value }));
  };

  // console.log(noteData);
  return (
    <>
      <StyledCard
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenModal}
        bgcolor={noteData.color}
        layoutType={layoutType}
      >
        <CardContent>
          <Typography>{noteData.title}</Typography>
          <Typography>{noteData.description}</Typography>
        </CardContent>
        {isHovered && (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <CardActions> */}
            <IconButton size="small">
              <AddAlertOutlined fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <PersonAddAltOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ColorLensOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <InsertPhotoOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ArchiveOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <MoreVertOutlinedIcon fontSize="small" />
            </IconButton>
            {/* </CardActions> */}
          </Box>
        )}
      </StyledCard>
      {/* // Model start */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Container bgcolor={noteData.color}>
          <TextField
            name="title"
            // placeholder="Title"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            style={{ marginBottom: "10px" }}
            // value={editedNoteData.title} // Use state value
            value={editedNoteData.title}
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            placeholder="Take a Note"
            multiline
            max-rows={Infinity}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={editedNoteData.description}
            onChange={handleInputChange}
            // value={noteData.description} // Use state value
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Box style={{ display: "flex", gap: "5%" }}>
              <IconButton>
                <AddAlertOutlined />
              </IconButton>
              <IconButton>
                <PersonAddAltOutlinedIcon />
              </IconButton>
              <IconButton>
                {/* onClick={handleColorClick} */}
                <ColorLensOutlinedIcon />
              </IconButton>
              <IconButton>
                <InsertPhotoOutlinedIcon />
              </IconButton>
              <IconButton>
                <ArchiveOutlinedIcon />
              </IconButton>
              <IconButton>
                <UndoOutlinedIcon />
              </IconButton>
              <IconButton>
                <RedoOutlinedIcon />
              </IconButton>
            </Box>
            <Box>
              <Button
                variant="text"
                sx={{ fontWeight: "bold" }}
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </>

    // Model end
  );
};

export default Note;
