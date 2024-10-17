import axios from "axios";

export const axiosInstance4000 = axios.create({
  baseURL: "http://localhost:4000",
});

export const axiosInstance5000 = axios.create({
  baseURL: "http://localhost:5000",
});
