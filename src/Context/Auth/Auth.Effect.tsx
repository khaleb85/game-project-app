import { Dispatch, useCallback } from "react";
import { AuthActionUnion } from "./Auth.Actions";

export const AuthEffects = (dispatch: Dispatch<AuthActionUnion>) => ({
  login: useCallback((email: string, pass: string) => {
    //call axios
    //use dispatch
  }, [])
});
