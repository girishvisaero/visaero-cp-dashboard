import axios, { noConfig } from "../config/axios";
import * as API from "./api";

const host = localStorage.getItem("host");
let user_id = localStorage.getItem("user_id");

export const getEnterPriseAccount = ({ signal }) => {
  return axios.get(API.getEnterpriseAccountHostDetails, {
    signal,
    params: {
      domain_host: window.location.hostname,
    },
  });
};

export const getNewsAndUpdates = ({ signal }) => {
  return axios.post(API.getNewsAndUpdates, {
    user_id,
  });
};
export const getNotifications = ({ signal }) => {
  return axios.get(API.getNotification, {
    signal,
    params: {
      host,
      user_id,
    },
  });
};

export const getDashboardData = ({ queryKey }) => {
  const [_, dates] = queryKey;

  const start_date = dates[0];
  const end_date = dates[1];

  return axios.post(API.getNewDashboard, {
    host,
    user_id,
    start_date,
    end_date,
  });
};

export const verifySession = async ({ signal }) => {
  let session_id = localStorage.getItem("session_id");
  user_id = localStorage.getItem("user_id");
  return axios.post(
    API.verifyAdminUserSession,
    {
      session_id,
      user_id,
    },
    {
      signal,
    }
  );
};

export const loginService = async (data) => {
  return noConfig.post(API.login, data);
};
export const forgotPassword = async (data) => {
  return noConfig.post(API.forgotPassword, data);
};

export const ipApi = async (data) => {
  return fetch(API.ipApi).then((res) => res.json());
};

export const getNationalities = async ({ signal }) => {
  return axios.get(API.getNationalities, {
    signal,
    params: {
      host,
    },
  });
};
export const getOrigin = async ({ signal }) => {
  return axios.get(API.getOrigin, {
    signal,
    params: {
      host,
    },
  });
};
export const getSupportedCurrencies = async ({ signal }) => {
  return axios.get(API.getSupportedCurrencies, {
    signal,
    params: {
      host,
    },
  });
};
export const getTravellingTo = async ({ queryKey }) => {
  const [_, obj] = queryKey;
  const { nationality, origin } = obj;
  // console.log("session_id", session_id);
  return axios.post(API.getTravellingto, {
    host,
    nationality,
    origin: nationality,
    user_id,
  });
};
export const getVisaOffers = async (data) => {
  // console.log(data)
  return axios.post(API.getVisaOffers, {
    ...data,
    host,
    user_id,
  });
};
