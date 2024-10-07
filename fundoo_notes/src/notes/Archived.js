// import React, { useEffect, useState } from "react";
// import Note from "./Note";
// import { getArchivedNote } from "../services/userServices";
// import { Grid, Typography } from "@mui/material";
// import { useOutletContext } from "react-router-dom";

// const Archived = () => {
//   const [archivedNotes, setArchivedNotes] = useState([]);
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

//   useEffect(() => {
//     const fetchArchivedNotes = async () => {
//       try {
//         const response = await getArchivedNote();
//         console.log("Archived Notes Response:", response.data);
//         setAllNotes(response.data.data);
//       } catch (error) {
//         console.error("Error fetching archived notes:", error);
//       }
//     };

//     fetchArchivedNotes();
//   }, []);

//   // const filteredNotes = archivedNotes
//   //   .filter
//   //   // (note) =>
//   //   //   note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
//   //   ();
//   const filteredNotes = allNotes.filter(
//     (note) =>
//       note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Grid
//       container
//       spacing={layoutType === "grid" ? 2 : 0}
//       justifyContent="center"
//     >
//       {filteredNotes.length > 0 ? (
//         filteredNotes.map((note, index) => (
//           <Grid
//             item
//             key={index}
//             // xs={layoutType === "grid" ? 3 : 12}
//             xs={12}
//             sm={12} //600
//             md={open ? 6 : layoutType === "grid" ? 6 : 12} //960
//             lg={open ? 4 : layoutType === "grid" ? 3 : 12} //1280
//             xl={open ? 4 : layoutType === "grid" ? 2 : 12} //1920
//             style={layoutType !== "grid" ? { marginBottom: "20px" } : {}}
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
//         <Typography>No archived notes to display</Typography>
//       )}
//     </Grid>
//   );
// };

// export default Archived;
//----------------------------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import Note from "./Note";
import { getArchivedNote } from "../services/userServices";
import { Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllNotes } from "../redux/noteSlice";
//import { fetchAllNotes, fetchArchivedNotes } from "../redux/noteSlice";

const Archived = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const {
    selectedTab,
    layoutType,
    searchQuery,
    handleNoteUpdate,
    // allNotes,
    // setAllNotes,
    handleNoteRemove,
    open,
    setOpen,
  } = useOutletContext();

  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.notes.allNotes); // Get notes from Redux store

  // useEffect(() => {
  //   const fetchArchivedNotes = async () => {
  //     try {
  //       const response = await getArchivedNote();
  //       console.log("Archived Notes Response:", response.data);
  //       setAllNotes(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching archived notes:", error);
  //     }
  //   };

  //   fetchArchivedNotes();
  // }, []);

  useEffect(() => {
    const fetchAllNotes = async () => {
      const response = await getArchivedNote();
      dispatch(setAllNotes(response.data.data)); // Dispatch setAllNotes action
    };

    fetchAllNotes();
  }, [dispatch]);

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
          <Grid
            item
            key={index}
            // xs={layoutType === "grid" ? 3 : 12}
            xs={12}
            sm={12} //600
            md={open ? 6 : layoutType === "grid" ? 6 : 12} //960
            lg={open ? 4 : layoutType === "grid" ? 3 : 12} //1280
            xl={open ? 4 : layoutType === "grid" ? 2 : 12} //1920
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
        <Typography>No archived notes to display</Typography>
      )}
    </Grid>
  );
};

export default Archived;
