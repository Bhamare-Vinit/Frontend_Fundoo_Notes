import React, { useEffect, useState } from "react";
import Form from "./Form";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Note from "./Note";
import Grid from "@mui/material/Grid";
import {
  getNote,
  getArchivedNote,
  getTrashNote,
} from "../services/userServices";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AllNotes from "./AllNotes";
import Trashed from "./Trashed";
import Archived from "./Archived";
import { Outlet } from "react-router-dom";

const Notes = ({ selectedTab, layoutType, searchQuery, open, setOpen }) => {
  const [noteData, setNoteData] = useState([
    {
      title: "",
      description: "",
      color: "",
      is_archive: "",
      is_trash: "",
      reminder: "",
    },
  ]);
  const [allNotes, setAllNotes] = useState([]);

  const handleNewNote = (newNote) => {
    setAllNotes((prevNotes) => [newNote, ...prevNotes]);
  };
  // useEffect(() => {
  //   console.log("Fetching notes for tab:", selectedTab);
  //   getAllNotes();
  // }, [selectedTab]);
  // const getAllNotes = async () => {
  //   if (selectedTab === "Notes") {
  //     const response = await getNote();
  //     setAllNotes(response.data.data);
  //   } else if (selectedTab === "Reminders") {
  //     // const response = await getNote();
  //     // // Filter notes where reminder is not empty (or not null) and is a valid date string
  //     // const notesToSet = response.data.data.filter((note) => {
  //     //   const reminderDate = note.reminder; // Assuming reminder can be a date or a string
  //     //   return reminderDate && !isNaN(new Date(reminderDate)); // Check if it's a valid date
  //     // });
  //     // console.log("Filtered Reminders:", notesToSet); // Log filtered reminders for debugging
  //     // setAllNotes(notesToSet);
  //   } else if (selectedTab === "Edit Labels") {
  //   } else if (selectedTab === "Archive") {
  //     const response = await getArchivedNote();
  //     console.log("Archieved Notes", response.data.data);
  //     setAllNotes(response.data.data);
  //   } else if (selectedTab === "Bin") {
  //     const response = await getTrashNote();
  //     console.log("Trashed Notes", response.data.data);
  //     setAllNotes(response.data.data);
  //   }

  //   //No idea why i used below line
  //   // setNoteData(response.data);
  // };
  // const filteredNotes = allNotes.filter((note) =>
  //   note.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  // / Function to handle note updates
  const handleNoteUpdate = (updatedNoteId, updatedNoteData) => {
    setAllNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNoteId ? { ...note, ...updatedNoteData } : note
      )
    );
  };
  const handleNoteRemove = (noteId) => {
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));

  // const renderNotes = () => {
  //   switch (selectedTab) {
  //     case "Notes":
  //       return (
  //         <AllNotes
  //           layoutType={layoutType}
  //           searchQuery={searchQuery}
  //           handleNoteUpdate={handleNoteUpdate}
  //         />
  //       );
  //     case "Archive":
  //       return (
  //         <Archived
  //           layoutType={layoutType}
  //           searchQuery={searchQuery}
  //           handleNoteUpdate={handleNoteUpdate}
  //         />
  //       );
  //     case "Bin":
  //       return (
  //         <Trashed
  //           layoutType={layoutType}
  //           searchQuery={searchQuery}
  //           handleNoteUpdate={handleNoteUpdate}
  //         />
  //       );
  //     default:
  //       return (
  //         <AllNotes
  //           layoutType={layoutType}
  //           searchQuery={searchQuery}
  //           handleNoteUpdate={handleNoteUpdate}
  //         />
  //       );
  //   }
  // };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        {/* can change */}
        <DrawerHeader />
        <Form
          noteData={noteData}
          setNoteData={setNoteData}
          handleNewNote={handleNewNote}
        />
        <DrawerHeader />
        <Outlet
          context={{
            selectedTab,
            layoutType,
            searchQuery,
            allNotes,
            setAllNotes,
            handleNoteUpdate,
            handleNoteRemove,
            open,
            setOpen,
          }}
        />
        {/* <Box
          sx={{
            margin: "auto",
            // border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            style={{ marginTop: 16 }}
            // spacing={2}
            spacing={layoutType === "grid" ? 2 : 0} // Adjust spacing based on layout
            direction={layoutType === "grid" ? "row" : "column"} // Change to column for list
            justifyContent="center"
            alignItems="center"
          >
          
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <Grid
                  item
                  key={index}
                  xs={layoutType === "grid" ? 3 : 12} // Full width in list mode
                  style={{
                    marginBottom: layoutType === "list" ? "16px" : "0", // Add spacing between rows in list mode
                  }}
                >
                  <Note
                    noteData={note}
                    layoutType={layoutType}
                    setNoteData={setNoteData}
                    onNoteUpdate={handleNoteUpdate}
                  />
                </Grid>
              ))
            ) : (
              <Typography>No notes to display</Typography>
            )}
            
          </Grid>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Notes;
