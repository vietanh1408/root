import { IAction } from "Models";
import { ACCESS_TOKEN } from "src/constants/local-storage";
import { AuthAction } from "../actions/auth";

interface IAuthInitState {
  token: string;
  loading: boolean;
}

interface IAuthAction extends IAction {
  payload: {
    accessToken: string;
  };
}

export const initialState: IAuthInitState = {
  token: "",
  loading: false,
};

const reducer = (state = initialState, action: IAuthAction) => {
  switch (action.type) {
    case AuthAction.LOGGING_IN: {
      return { ...state, loading: true };
    }
    case AuthAction.LOGIN_FAIL: {
      return { ...state, loading: false };
    }
    case AuthAction.LOGIN_SUCCESS: {
      localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
      return {
        ...state,
        loading: false,
        token: action.payload.accessToken,
      };
    }
    case AuthAction.REGISTERING: {
      return { ...state, loading: true };
    }
    case AuthAction.REGISTER_FAIL: {
      return { ...state, loading: false };
    }
    case AuthAction.REGISTER_SUCCESS: {
      localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
      return {
        ...state,
        token: action.payload.accessToken,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
