import Axios from "axios";

//Allows axios to work locally or live
let base = window.location.host.includes("localhost")
  ? "//localhost:3000/"
  : "/";

export const api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true,
});

//#region -- AUTH STUFF --
export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer;
};
export const resetBearer = function() {
  api.defaults.headers.authorization = "";
};
