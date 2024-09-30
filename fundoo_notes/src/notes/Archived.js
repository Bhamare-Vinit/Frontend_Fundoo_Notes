// ArchivedNotes.js
import React, { useEffect, useState } from "react";
import Note from "./Note"; // Import your Note component
import { getArchivedNote } from "../services/userServices"; // Import the API service
import { Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Archived = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const { layoutType, searchQuery, handleNoteUpdate } = useOutletContext();

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      try {
        const response = await getArchivedNote();
        console.log("Archived Notes Response:", response.data); // Debugging log
        setArchivedNotes(response.data.data);
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
  const filteredNotes = archivedNotes.filter(
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
