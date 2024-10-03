import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Modal,
  Select,
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
  deleteNote,
  add_Collaborator,
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
      ? `70%`
      : "240px"}; // Adjust width based on layoutType
`;

// "800px"

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  // start reminder logic
  const [reminderAnchorEl, setReminderAnchorEl] = useState(null); // For Popover
  const [reminderTime, setReminderTime] = useState(new Date().toISOString()); // Reminder Time

  // Function to open the Reminder Popover
  const handleReminderClick = (event) => {
    setReminderAnchorEl(event.currentTarget);
  };

  // Function to close the Reminder Popover
  const handleReminderClose = () => {
    setReminderAnchorEl(null);
  };

  // When clicking Save in the Reminder Popover
  const handleSaveReminder = async () => {
    setReminderAnchorEl(null); // Close the Popover
    const updatedNote = { ...editedNoteData, reminder: reminderTime }; // Add reminder time to note data
    setEditedNoteData(updatedNote);

    try {
      await updateNote(noteData.id, updatedNote); // Call the API to update the note
      if (onNoteUpdate) onNoteUpdate(noteData.id, updatedNote);
      console.log("Reminder set successfully!");
    } catch (error) {
      console.error("Failed to set reminder", error);
    }
  };

  // Handle reminder time change
  const handleReminderTimeChange = (e) => {
    setReminderTime(e.target.value);
  };
  //end reminder logic

  //start Collaborator logic
  const [collaboratorId, setCollaboratorId] = useState("");
  const [accessType, setAccessType] = useState("read_only");
  const [collaboratorPopoverAnchorEl, setCollaboratorPopoverAnchorEl] =
    useState(null);

  const handleCollaboratorClick = (event) => {
    setCollaboratorPopoverAnchorEl(event.currentTarget);
  };

  const handleCollaboratorClose = () => {
    setCollaboratorPopoverAnchorEl(null);
  };

  const handleAddCollaborator = async () => {
    const data = {
      note_id: parseInt(noteData.id),
      user_ids: [collaboratorId],
      access_type: accessType,
    };
    console.log(typeof data.note_id);
    console.log(typeof data.collaboratorId);

    try {
      const response = await add_Collaborator(data);
      console.log("Collaborator added:", response);
    } catch (error) {
      console.error("Failed to add collaborator", error);
    } finally {
      handleCollaboratorClose();
    }
  };

  //end collaborator logic
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

  //permenent Delete
  // const permenentDelete = async () => {
  //   setOpenModal(false);
  //   try {
  //     await deleteNote(noteData.id);
  //     if (handleNoteRemove) {
  //       handleNoteRemove(noteData.id); // Pass the ID of the note to be removed
  //     }
  //   } catch (error) {
  //     console.error("Failed to toggle Trash status", error);
  //   }
  // };

  const handlePermanentDelete = async () => {
    setOpenModal(false); // Close modal if open
    try {
      await deleteNote(noteData.id); // Call API to permanently delete the note
      if (handleNoteRemove) {
        handleNoteRemove(noteData.id); // Remove the note from the UI
      }
      console.log("Note permanently deleted");
    } catch (error) {
      console.error("Failed to permanently delete note", error);
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
                <IconButton size="small" onClick={handlePermanentDelete}>
                  <DeleteForever fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleDeleteNote}>
                  <RestoreFromTrash fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              // If selectedTag is not defined, show all IconButtons
              <>
                <IconButton size="small" onClick={handleReminderClick}>
                  <AddAlertOutlined fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleCollaboratorClick}>
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
        {/* start reminder popover*/}
        <Popover
          open={Boolean(reminderAnchorEl)}
          anchorEl={reminderAnchorEl}
          onClose={handleReminderClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Set Reminder</Typography>
            <TextField
              type="datetime-local"
              value={reminderTime}
              onChange={handleReminderTimeChange}
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleReminderClose}>Cancel</Button>
              <Button onClick={handleSaveReminder} variant="contained">
                Save
              </Button>
            </Box>
          </Box>
        </Popover>
        <Popover
          open={Boolean(collaboratorPopoverAnchorEl)}
          anchorEl={collaboratorPopoverAnchorEl}
          onClose={handleCollaboratorClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box p={2}>
            <Typography>Add Collaborator</Typography>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              value={collaboratorId}
              onChange={(e) => setCollaboratorId(e.target.value)}
              margin="dense"
            />
            <Select
              value={accessType}
              onChange={(e) => setAccessType(e.target.value)}
              fullWidth
              margin="dense"
            >
              <MenuItem value="read_only">Read Only</MenuItem>
              <MenuItem value="read_write">Read & Write</MenuItem>
            </Select>
            <Button
              onClick={handleAddCollaborator}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </Popover>

        {/* end  */}
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
            {selectedTab ? (
              // If selectedTag is defined, show only the first two IconButtons
              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "50%",
                }}
              >
                <IconButton size="small" onClick={handlePermanentDelete}>
                  <DeleteForever
                    fontSize="small"
                    // ocClick={() => {
                    //   permenentDelete;
                    // }}
                  />
                </IconButton>
                <IconButton size="small" onClick={handleDeleteNote}>
                  <RestoreFromTrash fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              // If selectedTag is not defined, show all IconButtons
              <Box style={{ display: "flex", gap: "5%" }}>
                <IconButton size="small" onClick={handleReminderClick}>
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
              </Box>
            )}

            {/* 
            <Box style={{ display: "flex", gap: "5%" }}>
              <IconButton>
                <AddAlertOutlined />
              </IconButton>
              <IconButton>
                <PersonAddAltOutlinedIcon />
              </IconButton>
              <IconButton onClick={handleColorClick}>
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
             */}

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
