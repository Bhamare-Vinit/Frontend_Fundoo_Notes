// // src/redux/slices/noteSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   openModal: false,
//   colorPickerOpen: null,
//   //   editedNoteData: {
//   //     title: "",
//   //     description: "",
//   //     color: "",
//   //     is_archive: false,
//   //     is_trash: false,
//   //     reminder: "",
//   //   },
//   reminderAnchorEl: null,
//   reminderTime: new Date().toISOString(),
//   reminderTime: "",
//   // collaboratorPopoverAnchorEl: null,
//   collaboratorId: "",
//   accessType: "read_only",
//   // anchorEl: null,
// };

// const noteSlice = createSlice({
//   name: "note",
//   initialState,
//   reducers: {
//     setOpenModal(state, action) {
//       state.openModal = action.payload;
//     },
//     setColorPickerOpen(state, action) {
//       state.colorPickerOpen = action.payload;
//     },
//     setReminderAnchorEl(state, action) {
//       state.reminderAnchorEl = action.payload;
//     },
//     setReminderTime(state, action) {
//       state.reminderTime = action.payload;
//     },
//     // setCollaboratorPopoverAnchorEl(state, action) {
//     //   state.collaboratorPopoverAnchorEl = action.payload;
//     // },
//     setCollaboratorId(state, action) {
//       state.collaboratorId = action.payload;
//     },
//     setAccessType(state, action) {
//       state.accessType = action.payload;
//     },
//     // setAnchorEl(state, action) {
//     //   state.anchorEl = action.payload;
//     // },
//     resetState(state) {
//       return initialState;
//     },
//   },
// });

// export const {
//   setOpenModal,
//   setColorPickerOpen,
//   setReminderAnchorEl,
//   setReminderTime,
//   // setCollaboratorPopoverAnchorEl,
//   setCollaboratorId,
//   setAccessType,
//   // setAnchorEl,
//   resetState,
// } = noteSlice.actions;

// export default noteSlice.reducer;

//---------------------------------------------------

// src/redux/noteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allNotes: [],
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setAllNotes: (state, action) => {
      state.allNotes = action.payload;
    },
    updateNote: (state, action) => {
      const { id, updatedNoteData } = action.payload;
      state.allNotes = state.allNotes.map((note) =>
        note.id === id ? { ...note, ...updatedNoteData } : note
      );
    },
    removeNote: (state, action) => {
      const noteId = action.payload;
      state.allNotes = state.allNotes.filter((note) => note.id !== noteId);
    },
    addNote: (state, action) => {
      state.allNotes.unshift(action.payload); // Add new note to the beginning of the array
    },
  },
});

export const { setAllNotes, updateNote, removeNote, addNote } = noteSlice.actions;
export default noteSlice.reducer;
