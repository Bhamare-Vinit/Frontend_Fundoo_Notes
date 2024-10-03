import { TextField, ClickAwayListener, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { IconButton, Popover } from "@mui/material";
import AddAlertOutlined from "@mui/icons-material/AddAlertOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import { createNote } from "../services/userServices";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  border-color: #e0e0e0;
  // width: 600px;
  width: 70%;
  border-radius: 8px;
  min-height: 30px;
  padding: 10px 15px;
  border: 1px solid black;
  background-color: ${(props) =>
    props.bgcolor || "white"}; // <-- Dynamic background color
`;

const Form = ({ noteData, setNoteData, handleNewNote }) => {
  const [showTextField, setShowTextField] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(null);
  const containerRef = useRef();
  const [reminderAnchor, setReminderAnchor] = useState(null);
  const [reminderTime, setReminderTime] = useState(""); // State to handle reminder time

  const onTextAreaClick = () => {
    setShowTextField(true);
    containerRef.current.style.minHeight = "70px";
  };

  const handleInput = async () => {
    const trimmedTitle = noteData.title;
    const trimmedDescription = noteData.description;
    const selectedColor = noteData.color;
    const reminder = noteData.reminder;

    if (trimmedTitle && trimmedDescription) {
      const note = {
        title: trimmedTitle,
        description: trimmedDescription,
        color: selectedColor,
        reminder: reminder,
      };

      try {
        const response = await createNote(note);
        console.log(
          "Note created successfully:____________________",
          response.data
        );
        console.log(
          "Note created successfully:++++++++++++++",
          response.data.data
        );

        handleNewNote(response.data.data);
        setNoteData({ title: "", description: "", color: "", reminder: "" });
      } catch (error) {
        console.error("Error creating note:", error);
        setNoteData({ title: "", description: "", color: "", reminder: "" });
      }
    } else {
      console.log("Please fill in both fields before submitting.");
      setNoteData({ title: "", description: "", color: "", reminder: "" });
    }
    setShowTextField(false);
    containerRef.current.style.minHeight = "30px";
  };
  const handleReminderClick = (event) => {
    setReminderAnchor(event.currentTarget);
  };

  const handleReminderClose = () => {
    setReminderAnchor(null);
  };

  const handleReminderSave = () => {
    setNoteData((prev) => ({ ...prev, reminder: reminderTime }));
    setReminderAnchor(null);
  };

  const handleClickAway = () => {
    handleInput();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({ ...prev, [name]: value }));
  };
  // start
  const handleColorClick = (event) => {
    setColorPickerOpen(event.currentTarget);
  };

  const handleColorClose = () => {
    setColorPickerOpen(null);
  };

  const handleColorSelect = (color) => {
    setNoteData((prev) => ({ ...prev, color }));
    setColorPickerOpen(null);
  };

  const openReminder = Boolean(reminderAnchor);
  const reminderId = openReminder ? "reminder-popover" : undefined;

  const open = Boolean(colorPickerOpen);
  const id = open ? "color-popover" : undefined;

  // end

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container ref={containerRef} bgcolor={noteData.color}>
        {showTextField && (
          <TextField
            name="title"
            placeholder="Title"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            style={{ marginBottom: "10px" }}
            value={noteData.title}
            onChange={handleChange}
          />
        )}
        <TextField
          name="description"
          placeholder="Take a Note"
          multiline
          max-rows={Infinity}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onClick={onTextAreaClick}
          value={noteData.description}
          onChange={handleChange}
        />
        {showTextField && (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1%",
              border: "1px solid black",
              // flexWrap: "wrap",
            }}
          >
            <Box
              style={{
                display: "flex",
                gap: { xs: "1%", sm: "5%", md: "5%", lg: "8%", xl: "8%" },
              }}
            >
              <IconButton
                onClick={handleReminderClick}
                sx={{
                  padding: {
                    xs: "3px",
                    sm: "5px",
                    md: "8px",
                    lg: "8px",
                    xl: "8px",
                  },
                }}
              >
                <AddAlertOutlined
                  sx={{
                    fontSize: { xs: "20px", sm: "24px", md: "26px" },
                  }}
                />
              </IconButton>
              <IconButton
                sx={{
                  padding: {
                    xs: "3px",
                    sm: "5px",
                    md: "8px",
                    lg: "8px",
                    xl: "8px",
                  },
                }}
              >
                <PersonAddAltOutlinedIcon
                  sx={{
                    fontSize: { xs: "20px", sm: "24px", md: "26px" },
                  }}
                />
              </IconButton>
              <IconButton
                onClick={handleColorClick}
                sx={{
                  padding: {
                    xs: "3px",
                    sm: "5px",
                    md: "8px",
                    lg: "8px",
                    xl: "8px",
                  },
                }}
              >
                <ColorLensOutlinedIcon
                  sx={{
                    fontSize: { xs: "20px", sm: "24px", md: "26px" },
                  }}
                />
              </IconButton>
              <IconButton
                sx={{
                  padding: {
                    xs: "3px",
                    sm: "5px",
                    md: "8px",
                    lg: "8px",
                    xl: "8px",
                  },
                }}
              >
                <InsertPhotoOutlinedIcon
                  sx={{
                    fontSize: { xs: "20px", sm: "24px", md: "26px" },
                  }}
                />
              </IconButton>
              <IconButton
                sx={{
                  padding: {
                    xs: "3px",
                    sm: "5px",
                    md: "8px",
                    lg: "8px",
                    xl: "8px",
                  },
                }}
              >
                <ArchiveOutlinedIcon
                  sx={{
                    fontSize: { xs: "20px", sm: "24px", md: "26px" },
                  }}
                />
              </IconButton>
              {/* <IconButton>
                <UndoOutlinedIcon />
              </IconButton>
              <IconButton>
                <RedoOutlinedIcon />
              </IconButton> */}
            </Box>
            <Box>
              <Button
                variant="text"
                style={{
                  fontWeight: "bold",
                  fontSize: { xs: "20px", sm: "24px", md: "26px" },
                }}
                onClick={handleInput}
              >
                Close
              </Button>
            </Box>
          </Box>
        )}

        {/* start */}
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
              <IconButton key={index} onClick={() => handleColorSelect(color)}>
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

        <Popover
          id={reminderId}
          open={openReminder}
          anchorEl={reminderAnchor}
          onClose={handleReminderClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box sx={{ p: 2 }}>
            <TextField
              label="Set Reminder"
              type="datetime-local"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button onClick={handleReminderSave}>Save</Button>
          </Box>
        </Popover>

        {/* end */}
      </Container>
    </ClickAwayListener>
  );
};

export default Form;
