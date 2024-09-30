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
import { TextField, ClickAwayListener, Button, Popover } from "@mui/material";
import { useState, useRef, useEffect } from "react";
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
  // margin-bottom: 20px;
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

const Note = ({ noteData, layoutType, onNoteUpdate }) => {
  const containerRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  // start
  const [openModal, setOpenModal] = useState(false);

  const [colorPickerOpen, setColorPickerOpen] = useState(null);
  const [editedNoteData, setEditedNoteData] = useState({
    title: noteData.title,
    description: noteData.description,
    color: noteData.color,
    is_archive: noteData.is_archive,
    is_trash: noteData.is_trash,
    reminder: noteData.reminder,
  });

  //open modal and give initial values
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

  //close modal
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

  //handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNoteData((prev) => ({ ...prev, [name]: value }));
  };
  //color logic

  //
  const handleColorClick = (event) => {
    setColorPickerOpen(event.currentTarget);
    console.log("I clicked on color handleColorClick run");
  };

  //close color picker in modal
  const handleColorClose = () => {
    setColorPickerOpen(null);
  };

  const handleColorSelect = async (color) => {
    setEditedNoteData((prev) => ({ ...prev, color }));
    setColorPickerOpen(null);

    if (onNoteUpdate) {
      onNoteUpdate(noteData.id, { ...editedNoteData, color });
    }
  };

  // const handleColors = async (color) => {
  //   setEditedNoteData((prev) => ({ ...prev, color }));
  //   const updatedNoteData = { ...editedNoteData, color };

  //   if (onNoteUpdate) {
  //     onNoteUpdate(noteData.id, { ...editedNoteData, color });
  //   }
  //   console.log("is it working");
  //   try {
  //     await updateNote(noteData.id, editedNoteData); // Call the API to update the note with its ID
  //     console.log("Note updated successfully");

  //     // Optionally trigger a callback to update the note in the parent component
  //     // if (onNoteUpdate) {
  //     //   onNoteUpdate(noteData.id, editedNoteData);
  //     // }
  //   } catch (error) {
  //     console.error("Failed to update note", error);
  //   }

  //   setColorPickerOpen(null);
  // };
  //start
  const handleColors = (color) => {
    // Update the state with the selected color
    setEditedNoteData((prev) => ({ ...prev, color }));

    // Close the color picker
    setColorPickerOpen(null);
  };

  // Use useEffect to trigger the API call when the color changes
  useEffect(() => {
    if (editedNoteData.color) {
      handleColorUpdates(); // Trigger the API call whenever color changes
    }
  }, [editedNoteData.color]);

  // Function to handle the API call and update the database
  const handleColorUpdates = async () => {
    try {
      // Call the API to update the note in the database
      await updateNote(noteData.id, editedNoteData);
      console.log("Note color updated successfully");

      // Optionally, you can trigger the callback to update the parent component
      if (onNoteUpdate) {
        onNoteUpdate(noteData.id, editedNoteData);
      }
    } catch (error) {
      console.error("Failed to update note color", error);
    }
  };

  //end

  const open = Boolean(colorPickerOpen);
  const id = open ? "color-popover" : undefined;
  // console.log(noteData);
  return (
    <>
      <StyledCard
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // onClick={handleOpenModal}
        bgcolor={noteData.color}
        layoutType={layoutType}
      >
        <CardContent onClick={handleOpenModal}>
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
            <IconButton size="small" onClick={handleColorClick}>
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
        <Container ref={containerRef} bgcolor={noteData.color}>
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
              <IconButton onClick={handleColorClick}>
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
      {/* Popover for color picker */}
      <Popover
        id={id}
        open={open}
        anchorEl={colorPickerOpen}
        onClose={handleColorClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box sx={{ display: "flex", p: 2 }}>
          {[
            "#f28b82",
            "#fbbc04",
            "#fff475",
            "#ccff90",
            "#a7ffeb",
            "#cbf0f8",
            "#aecbfa",
            "#d7aefb",
            "#fdcfe8",
          ].map((color, index) => (
            <IconButton
              key={index}
              onClick={() => {
                if (openModal) {
                  handleColorSelect(color); // If modal is open, call handleColorSelect
                } else {
                  handleColors(color); // Otherwise, call handleColors
                }
              }}
            >
              {/* onClick={() => handleColorSelect(color)} */}
              <Box
                sx={{
                  backgroundColor: color,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                }}
              />
            </IconButton>
          ))}
        </Box>
      </Popover>
    </>

    // Model end
  );
};

export default Note;
