import { Dispatch, useCallback } from "react";
import { AuthActionUnion } from "./Auth.Actions";
import { IAuthEffects } from "./Interfaces/IAuthEffects";
import AuthService from '../../Data/Services/AuthService';

export type AuthEffectsType = (dispatch: Dispatch<AuthActionUnion>) => IAuthEffects;

export const AuthEffects: AuthEffectsType = (dispatch: Dispatch<AuthActionUnion>) => ({
  login: useCallback(async (email: string, password: string) => {
    try {
      const response = await AuthService.login({ email, password });
      console.log(response);
    } catch(err) {
      if (err.response) {
        console.log(err.response.data.errors);
      }
    }
    //call axios
    //use dispatch
  }, [])
});
