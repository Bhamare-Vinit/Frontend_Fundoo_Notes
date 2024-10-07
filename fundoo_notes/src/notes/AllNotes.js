// import React from "react";
// import { useEffect, useState } from "react";
// import Note from "./Note";
// import { getNote } from "../services/userServices";
// import { Grid, Typography } from "@mui/material";
// import { useOutletContext } from "react-router-dom";

// const AllNotes = () => {
//   // const [allNotes, setAllNotes] = useState([]);
//   const {
//     selectedTab,
//     layoutType,
//     searchQuery,
//     handleNoteUpdate,
//     allNotes,
//     setAllNotes,
//     handleNoteRemove,
//     open,
//     setOpen,
//   } = useOutletContext();

//   console.log("8888888888888888888", searchQuery);

//   useEffect(() => {
//     const fetchAllNotes = async () => {
//       const response = await getNote();
//       setAllNotes(response.data.data);
//       console.log("All Notes__________________________:", response.data.data);
//     };

//     fetchAllNotes();
//   }, []);

//   // const filteredNotes = allNotes.filter(
//   //   (note) =>
//   //     note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
//   // );
//   const filteredNotes = allNotes.filter(
//     (note) =>
//       note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   return (
//     <Grid
//       container
//       spacing={layoutType === "grid" ? 2 : 0}
//       justifyContent="center"
//       // border="1px solid red"
//     >
//       {filteredNotes.length > 0 ? (
//         filteredNotes.map((note, index) => (
//           <Grid
//             item
//             key={index}
//             // xs={12}
//             // sm={6}
//             // md={layoutType === "grid" ? 4 : 12}
//             // // lg={layoutType === "grid" ? 3 : 12}
//             // // xs={layoutType === "grid" ? 3 : 12}
//             // lg={open ? 4 : layoutType === "grid" ? 3 : 12}
//             xs={12}
//             sm={12}
//             md={open ? 6 : layoutType === "grid" ? 6 : 12} //960
//             lg={open ? 4 : layoutType === "grid" ? 3 : 12} //1280
//             xl={open ? 4 : layoutType === "grid" ? 2 : 12} //1920
//             style={layoutType !== "grid" ? { marginBottom: "20px" } : {}}
//             // border="1px solid black"
//           >
//             <Note
//               noteData={note}
//               layoutType={layoutType}
//               onNoteUpdate={handleNoteUpdate}
//               handleNoteRemove={handleNoteRemove}
//             />
//           </Grid>
//         ))
//       ) : (
//         <Typography>No notes to display</Typography>
//       )}
//     </Grid>
//   );
// };

// export default AllNotes;


//----------------------------------------------------------------------------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import Note from "./Note";
import { getNote } from "../services/userServices";
import { setAllNotes } from "../redux/noteSlice"; // Import action

const AllNotes = () => {
  const {
    selectedTab,
    layoutType,
    searchQuery,
    handleNoteUpdate,
    handleNoteRemove,
    open,
    setOpen,
  } = useOutletContext();

  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.notes.allNotes); // Get notes from Redux store

  useEffect(() => {
    const fetchAllNotes = async () => {
      const response = await getNote();
      dispatch(setAllNotes(response.data.data)); // Dispatch setAllNotes action
    };

    fetchAllNotes();
  }, [dispatch]);

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
            xs={12}
            sm={12}
            md={open ? 6 : layoutType === "grid" ? 6 : 12}
            lg={open ? 4 : layoutType === "grid" ? 3 : 12}
            xl={open ? 4 : layoutType === "grid" ? 2 : 12}
            style={layoutType !== "grid" ? { marginBottom: "20px" } : {}}
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

