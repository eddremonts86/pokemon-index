import Axios from "axios";
import { globalEnv } from "./global.env";

export const axiosConf = () => {
  return {
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  };
};

export const getById = (endpoint, id) => {
  const { urlBase } = globalEnv;
  const url = `${urlBase + endpoint}/${id}`;
  return Axios.get(url, axiosConf, id);
};

export const getByFilter = (endpoint, filter) => {
  const { urlBase } = globalEnv;
  const url = `${urlBase + endpoint}?${filter}`;
  return Axios.get(url, axiosConf);
};

export const get = (endpoint) => {
  const { urlBase } = globalEnv;
  const url = `${urlBase + endpoint}`;
  return Axios.get(url, axiosConf);
};

export const getByUrl = (url) => {
  return Axios.get(url, axiosConf);
};
