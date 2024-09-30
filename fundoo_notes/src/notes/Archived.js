import React, { useEffect, useState } from "react";
import Note from "./Note";
import { getArchivedNote } from "../services/userServices";
import { Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Archived = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const {
    selectedTab,
    layoutType,
    searchQuery,
    handleNoteUpdate,
    allNotes,
    setAllNotes,
    handleNoteRemove,
  } = useOutletContext();

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      try {
        const response = await getArchivedNote();
        console.log("Archived Notes Response:", response.data);
        setAllNotes(response.data.data);
      } catch (error) {
        console.error("Error fetching archived notes:", error);
      }
    };

    fetchArchivedNotes();
  }, []);

  // const filteredNotes = archivedNotes
  //   .filter
  //   // (note) =>
  //   //   note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   ();
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
          <Grid item key={index} xs={layoutType === "grid" ? 3 : 12}>
            <Note
              noteData={note}
              layoutType={layoutType}
              onNoteUpdate={handleNoteUpdate}
              handleNoteRemove={handleNoteRemove}
            />
          </Grid>
        ))
      ) : (
        <Typography>No archived notes to display</Typography>
      )}
    </Grid>
  );
};

export default Archived;
