import { Dispatch, useCallback } from "react";
import { AuthActionUnion, AuthActions } from "./Auth.Actions";
import { IAuthEffects } from "./Interfaces/IAuthEffects";
import { FormikHelpers, FormikValues } from "formik";
import AuthService from '../../Data/Services/AuthService';

export type AuthEffectsType = (dispatch: Dispatch<AuthActionUnion>) => IAuthEffects;

export const AuthEffects: AuthEffectsType = (dispatch: Dispatch<AuthActionUnion>) => ({
  login: useCallback(async (email: string, password: string, helpers: FormikHelpers<FormikValues>) => {
    try {
      dispatch(AuthActions.startLoading());
      const { data } = await AuthService.login({ email, password });
      dispatch(AuthActions.loginSuccess(data.data));
    } catch(err) {
      const res = err.response;
      if (res && res.data && res.data.errors) {
        dispatch(AuthActions.loginError(res.data.errors.map((x: any) => x.message)));
      }
    } finally {
      helpers.setSubmitting(false);
    }
  }, [])
});
