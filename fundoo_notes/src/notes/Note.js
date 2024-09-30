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
import DeleteForever from "@mui/icons-material/DeleteForever";
import {
  updateNote,
  toggleArchive,
  toggleTrash,
} from "../services/userServices";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RestoreFromTrash from "@mui/icons-material/RestoreFromTrash";

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

const Note = ({
  selectedTab,
  noteData,
  layoutType,
  onNoteUpdate,
  handleNoteRemove,
}) => {
  console.log("TTTTTTTAg:", selectedTab);
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
  // start
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteNote = async () => {
    setAnchorEl(null);
    setOpenModal(false);
    try {
      await toggleTrash(noteData.id); // Call API to toggle archive status
      // setEditedNoteData((prev) => ({
      //   ...prev,
      //   is_archive: !prev.is_archive, // Update local state for archive status
      // }));

      if (handleNoteRemove) {
        handleNoteRemove(noteData.id); // Pass the ID of the note to be removed
      }
      console.log("Note Trash status toggled");
    } catch (error) {
      console.error("Failed to toggle Trash status", error);
    }
  };

  // end

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
    try {
      await updateNote(noteData.id, editedNoteData);
      console.log("Note updated successfully");

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
  const handleColorClick = (event) => {
    setColorPickerOpen(event.currentTarget);
    console.log("I clicked on color handleColorClick run");
  };

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
  const handleArchiveToggle = async () => {
    setOpenModal(false);
    try {
      await toggleArchive(noteData.id); // Call API to toggle archive status
      // setEditedNoteData((prev) => ({
      //   ...prev,
      //   is_archive: !prev.is_archive, // Update local state for archive status
      // }));

      if (handleNoteRemove) {
        handleNoteRemove(noteData.id); // Pass the ID of the note to be removed
      }
      console.log("Note archive status toggled");
    } catch (error) {
      console.error("Failed to toggle archive status", error);
    }
  };
  //start
  const handleColors = (color) => {
    setEditedNoteData((prev) => ({ ...prev, color }));
    setColorPickerOpen(null);
  };

  useEffect(() => {
    if (editedNoteData.color) {
      handleColorUpdates();
    }
  }, [editedNoteData.color]);

  const handleColorUpdates = async () => {
    try {
      await updateNote(noteData.id, editedNoteData);
      console.log("Note color updated successfully");

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
            {/* <IconButton size="small">
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
            <IconButton size="small" onClick={handleArchiveToggle}>
              <ArchiveOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickMenu}
            >
              <MoreVertOutlinedIcon fontSize="small" />
            </IconButton> */}
            {/* </CardActions> */}
            {selectedTab ? (
              // If selectedTag is defined, show only the first two IconButtons
              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "50%",
                }}
              >
                <IconButton size="small">
                  <DeleteForever fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <RestoreFromTrash
                    fontSize="small"
                    onClick={handleDeleteNote}
                  />
                </IconButton>
              </Box>
            ) : (
              // If selectedTag is not defined, show all IconButtons
              <>
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
                <IconButton size="small" onClick={handleArchiveToggle}>
                  <ArchiveOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickMenu}
                >
                  <MoreVertOutlinedIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        )}
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleDeleteNote}>Delete note</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Add Labels</MenuItem>
        </Menu>
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
              <IconButton onClick={handleArchiveToggle}>
                <ArchiveOutlinedIcon />
              </IconButton>
              <IconButton
                size="small"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickMenu}
              >
                <MoreVertOutlinedIcon fontSize="small" />
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
                  handleColorSelect(color);
                } else {
                  handleColors(color);
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
