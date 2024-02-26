import axios, { AxiosInstance } from "axios";

const apiBaseUrl = "http://localhost:8080/api/v1/";
let loggedIn = false;
const username: string | null = null;

const api: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

const setJwtHeader = (jwtToken: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
  loggedIn = true;
};

// const jwt = localStorage.getItem("token");
// if (jwt) setJwtHeader(jwt);

export { api, loggedIn, setJwtHeader };
