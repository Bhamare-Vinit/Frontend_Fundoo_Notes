import axios from "axios";
// http://127.0.0.1:8000/user/register/

const baseUrl = "http://127.0.0.1:8000/user/";
export const signUp = async (data) => {
  console.log("Ise data mil raha he ky?;:", data);
  let response = await axios.post(baseUrl + "register/", data);
  console.log("Kuch responce mil raha he ky?:", response.data);
  return response;
};

export const signIn = async (data) => {
  console.log("Ise data mil raha he ky?;:", data);
  let response = await axios.post(baseUrl + "login/", data);
  console.log("Kuch responce mil raha he ky?:", response.data);
  return response;
};
