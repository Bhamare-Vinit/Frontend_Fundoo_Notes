import React from "react";
import { useEffect, useState } from "react";
import Note from "./Note"; // Import your Note component
import { getNote } from "../services/userServices"; // Import the API service
import { Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const AllNotes = () => {
  // const [allNotes, setAllNotes] = useState([]);
  const { layoutType, searchQuery, handleNoteUpdate, allNotes, setAllNotes } =
    useOutletContext();

  useEffect(() => {
    const fetchAllNotes = async () => {
      const response = await getNote();
      setAllNotes(response.data.data);
      console.log("All Notes__________________________:", response.data.data);
    };

    fetchAllNotes();
  }, []);

  // const filteredNotes = allNotes.filter(
  //   (note) =>
  //     note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );
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
            xs={layoutType === "grid" ? 3 : 12}
            style={layoutType !== "grid" ? { marginBottom: "20px" } : {}}
          >
            <Note
              noteData={note}
              layoutType={layoutType}
              onNoteUpdate={handleNoteUpdate}
            />
          </Grid>
        ))
      ) : (
        <Typography>No notes to display</Typography>
      )}
    </Grid>
  );
};

export default AllNotes;
