import axios from "axios";

export const client = axios.create({
  baseURL: "https://front-end-task.bmbzr.ir",
  // Required to send cookies and identify the user's session on the backend.
  withCredentials: true,
});
