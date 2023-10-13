import axiosConfig from "axios";

const baseURL = "https://visaero-stage-backend.visaero.com";

const axios = axiosConfig.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export const noConfig = axiosConfig.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default axios;
