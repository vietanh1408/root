import axiosClient from "../axios";

const authAPI = {
  login(params: any) {
    const url = "auth/login";
    return axiosClient.post(url, params);
  },
};

export default authAPI;
