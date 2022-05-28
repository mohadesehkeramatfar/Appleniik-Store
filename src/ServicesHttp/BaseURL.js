import axios from "axios";

axios.defaults.baseURL = "http://back.appleniik.ir:5000/api";
// axios.defaults.baseURL = "http://localhost:5000/api";

export const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};
