import { IAuthContext } from "./Interfaces/IAuthContext";
import { AuthActionUnion, AuthActionKeys } from "./Auth.Actions";

export const INITIAL_STATE: IAuthContext = {
  isLogged: false,
  isLoading: false
};

export const AuthReducers = (state = INITIAL_STATE, action: AuthActionUnion): IAuthContext => {
  switch(action.type) {
    case AuthActionKeys.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: true,
      };
    case AuthActionKeys.START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state;
  }
}