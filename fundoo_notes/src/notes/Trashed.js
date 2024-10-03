import React, { useEffect, useState } from "react";
import Note from "./Note";
import { getTrashNote } from "../services/userServices";
import { Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Trashed = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);
  const {
    allNotes,
    setAllNotes,
    selectedTab,
    layoutType,
    searchQuery,
    handleNoteUpdate,
    handleNoteRemove,
    open,
    setOpen,
  } = useOutletContext();

  useEffect(() => {
    const fetchTrashedNotes = async () => {
      try {
        const response = await getTrashNote();
        console.log("Trashed Notes Response:", response.data.data);
        setAllNotes(response.data.data);
      } catch (error) {
        console.error("Error fetching trashed notes:", error);
      }
    };
    fetchTrashedNotes();
  }, []);

  //   const filteredNotes = trashedNotes.filter(
  //     // (note) =>
  //     //   note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  const filteredNotes = allNotes.filter(
    (note) =>
      note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid
      container
      spacing={layoutType === "grid" ? 2 : 0}
      justifyContent="center"
    >
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note, index) => (
          <Grid
            item
            key={index}
            // xs={layoutType === "grid" ? 3 : 12}
            xs={12} // Full width on extra small screens
            sm={12} // Full width on small screens (list view)600
            md={open ? 6 : layoutType === "grid" ? 6 : 12} //960 One-third width on medium screens when drawer is open; otherwise, follow layout type
            lg={open ? 4 : layoutType === "grid" ? 3 : 12} //1280 One-third width on large screens when drawer is open; otherwise, follow layout type
            xl={open ? 4 : layoutType === "grid" ? 2 : 12} //1920
            style={layoutType !== "grid" ? { marginBottom: "20px" } : {}}
          >
            <Note
              selectedTab={selectedTab}
              noteData={note}
              layoutType={layoutType}
              onNoteUpdate={handleNoteUpdate}
              handleNoteRemove={handleNoteRemove}
            />
          </Grid>
        ))
      ) : (
        <Typography>No trashed notes to display</Typography>
      )}
    </Grid>
  );
};

export default Trashed;
