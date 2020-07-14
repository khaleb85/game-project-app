import { Dispatch, useCallback } from "react";
import { AuthActionUnion, AuthActions } from "./Auth.Actions";
import { IAuthEffects } from "./Interfaces/IAuthEffects";
import { FormikHelpers, FormikValues } from "formik";
import { GoogleSignin } from "@react-native-community/google-signin";
import { LoginManager, AccessToken } from 'react-native-fbsdk';
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
  }, []),

  loginAsGoogle: useCallback(async () => {
    try {
      dispatch(AuthActions.startLoading());
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('verified');
      const userInfo = await GoogleSignin.signIn();
      console.log('info', userInfo);
      dispatch(AuthActions.loginSuccess({}));
      await AuthService.loginAsGoogle({ idToken: userInfo.idToken, userId: userInfo.user.id });
    } catch(err) {
      console.log('err', JSON.stringify(err));
    }
  }, []),

  loginAsFacebook: useCallback(async () => {
    try {
      dispatch(AuthActions.startLoading());
      const permissions = ['public_profile', 'email'];
      const resultWithPermissions = await LoginManager.logInWithPermissions(permissions);

      if (!resultWithPermissions.isCancelled) {
        const asd = await AccessToken.getCurrentAccessToken();

        console.log('asd: ', asd);
        dispatch(AuthActions.loginSuccess({}));
        return;
      }
      
      dispatch(AuthActions.loginSuccess({}));
    } catch(err) {
      console.log('err', JSON.stringify(err));
    }
  }, []),
});
