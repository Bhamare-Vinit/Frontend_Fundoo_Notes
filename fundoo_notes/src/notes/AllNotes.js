import React from "react";
import { useEffect, useState } from "react";
import Note from "./Note";
import { getNote } from "../services/userServices";
import { Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const AllNotes = () => {
  // const [allNotes, setAllNotes] = useState([]);
  const {
    selectedTab,
    layoutType,
    searchQuery,
    handleNoteUpdate,
    allNotes,
    setAllNotes,
    handleNoteRemove,
    open,
    setOpen,
  } = useOutletContext();

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
      border="1px solid red"
    >
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note, index) => (
          <Grid
            item
            key={index}
            // xs={12} // Full width on extra small screens
            // sm={6} // Full width on small screens (list view)
            // md={layoutType === "grid" ? 4 : 12} // One-third width on medium screens for grid view, full width for list view
            // // lg={layoutType === "grid" ? 3 : 12} // One-fourth width on large screens or full width based on layoutType
            // // xs={layoutType === "grid" ? 3 : 12}
            // lg={open ? 4 : layoutType === "grid" ? 3 : 12}
            xs={12} // Full width on extra small screens
            sm={12} // Full width on small screens (list view)600
            md={open ? 6 : layoutType === "grid" ? 6 : 12} //960 One-third width on medium screens when drawer is open; otherwise, follow layout type
            lg={open ? 4 : layoutType === "grid" ? 3 : 12} //1280 One-third width on large screens when drawer is open; otherwise, follow layout type
            xl={open ? 4 : layoutType === "grid" ? 2 : 12} //1920
            style={layoutType !== "grid" ? { marginBottom: "20px" } : {}}
            border="1px solid black"
          >
            <Note
              noteData={note}
              layoutType={layoutType}
              onNoteUpdate={handleNoteUpdate}
              handleNoteRemove={handleNoteRemove}
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
