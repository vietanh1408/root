import authAPI from "@/utils/api/auth";
import { LoginInput } from "src/pages/login";
import { RegisterInput } from "src/pages/register";

export enum AuthAction {
  LOGGING_IN = "[authentication] LOGGING_IN",
  LOGIN_SUCCESS = "[authentication] LOGIN_SUCCESS",
  LOGIN_FAIL = "[authentication] LOGIN_FAIL",
  REGISTERING = "[authentication] REGISTERING",
  REGISTER_SUCCESS = "[authentication] REGISTER_SUCCESS",
  REGISTER_FAIL = "[authentication] REGISTER_FAIL",
  REFRESH_TOKEN = "[authentication] REFRESH_TOKEN",
}

export const fetchLogin = async (value: LoginInput) => {
  try {
    const response = await authAPI.login(value);

    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchRegister = async (value: RegisterInput) => {
  try {
    const response = await authAPI.register(value);

    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchRefreshToken = async (refreshToken: string) => {
  try {
    const response = await authAPI.refreshToken(refreshToken);

    return response.data;
  } catch (e) {
    return e;
  }
};
