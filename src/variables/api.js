import axios from "axios";

import { BASE_URL } from "../config";

axios.defaults.baseURL = `${BASE_URL}`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const Api = {
  register: async (data) => {
    try {
      const response = await axios.post("/register", JSON.stringify(data));
      return response.data;
    } catch (err) {
      return err.data;
    }
  },
  getUsers: async () => {
    try {
      const response = await axios.get("/users");
      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      return err;
    }
  },
  getOneUser: async (user_id) => {
    try {
      const response = await axios.get(`/${user_id}/transactions`);
      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      return err;
    }
  },
  depost: async (user_id, data) => {
    try {
      const response = await axios.put(
        `/${user_id}/deposit`,
        JSON.stringify(data)
      );
      return response.data;
    } catch (err) {
      return err.data;
    }
  },
  withdraw: async (user_id, data) => {
    try {
      const response = await axios.put(
        `/${user_id}/withdraw`,
        JSON.stringify(data)
      );
      return response.data;
    } catch (err) {
      return err.data;
    }
  },
  updatePackage: async (user_id, data) => {
    try {
      const response = await axios.put(
        `/${user_id}/update-package`,
        JSON.stringify(data)
      );
      return response.data;
    } catch (err) {
      return err.data;
    }
  },
};

export default Api;
