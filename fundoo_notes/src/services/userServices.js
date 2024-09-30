import axios from "axios";
// http://127.0.0.1:8000/user/register/

const baseUrl = "http://127.0.0.1:8000/user/";
export const signUp = async (data) => {
  console.log("Ise data mil raha he ky?;:", data);
  let response = await axios.post(baseUrl + "register/", data);
  console.log("Kuch responce mil raha he ky? :", response.data);
  return response;
};

export const signIn = async (data) => {
  console.log("Ise data mil raha he ky?;:", data);
  let response = await axios.post(baseUrl + "login/", data);
  console.log("Kuch responce mil raha he ky?:", response.data);
  return response;
};

const noteUrl = "http://127.0.0.1:8000/notes/";

export const createNote = async (data) => {
  const token = localStorage.getItem("access");
  console.log("token:", token);

  let response = await axios.post(noteUrl + "notes/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Here is response:", response.data);
  return response;
};
const token = localStorage.getItem("access");
export const getNote = async (data) => {
  console.log("token:", token);

  let response = await axios.get(noteUrl + "notes/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Here is response:", response.data);
  return response;
};

export const getArchivedNote = async (data) => {
  let response = await axios.get(noteUrl + "notes/archived_notes/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Here is response:", response.data);
  return response;
};

export const getTrashNote = async (data) => {
  let response = await axios.get(noteUrl + "notes/trashed_notes/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Here is response:", response.data);
  return response;
};

export const updateNote = async (noteId, data) => {
  const token = localStorage.getItem("access");

  try {
    let response = await axios.put(`${noteUrl}notes/${noteId}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Note updated successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};
