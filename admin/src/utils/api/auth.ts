import { LoginInput } from "src/pages/login";
import { RegisterInput } from "src/pages/register";
import axiosClient from "../axios";

const authAPI = {
  login(params: LoginInput) {
    const url = "auth/login";
    return axiosClient.post(url, params);
  },

  register(params: RegisterInput) {
    const url = "auth/register";
    return axiosClient.post(url, params);
  },

  refreshToken(refreshToken: string) {
    const url = "refresh_token";
    return axiosClient.post(url, refreshToken);
  },
};

export default authAPI;
