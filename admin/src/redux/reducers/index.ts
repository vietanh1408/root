import { combineReducers } from "redux";
import auth, { initialState as authInitial } from "./auth";

export const initialState = {
  auth: authInitial,
};

const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

const reducers = (state = initialState, action: any) => {
  return rootReducer(state, action);
};

export default reducers;
