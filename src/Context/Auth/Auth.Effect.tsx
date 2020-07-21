import { Dispatch, useCallback } from "react";
import { AuthActionUnion, AuthActions } from "./Auth.Actions";
import { IAuthEffects } from "./Interfaces/IAuthEffects";
import { FormikHelpers, FormikValues } from "formik";
import { GoogleSignin } from "@react-native-community/google-signin";
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { TwitterLogin } from 'react-native-login-twitter';
import { TWITTER_API_KEY, TWITTER_API_SECRET_KEY } from 'react-native-dotenv';
import AuthService from '../../Data/Services/AuthService';

export type AuthEffectsType = (dispatch: Dispatch<AuthActionUnion>) => IAuthEffects;

export const AuthEffects: AuthEffectsType = (dispatch: Dispatch<AuthActionUnion>) => ({
  login: useCallback(async (email: string, password: string, helpers: FormikHelpers<FormikValues>) => {
    try {
      dispatch(AuthActions.setLoading(true));
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
      dispatch(AuthActions.setLoading(true));
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo) { dispatch(AuthActions.setLoading(false)); }

      const result = await AuthService.loginAsGoogle({ idToken: userInfo.idToken, userId: userInfo.user.id });

      if (!result || !result.data) { dispatch(AuthActions.setLoading(false)); }

      console.log(result.data.data);
      dispatch(AuthActions.loginSuccess(result.data.data));
    } catch(err) {
      console.log('err', JSON.stringify(err));
    }
  }, []),

  loginAsFacebook: useCallback(async () => {
    try {
      dispatch(AuthActions.setLoading(true));
      const permissions = ['public_profile', 'email'];
      const resultWithPermissions = await LoginManager.logInWithPermissions(permissions);

      if (!resultWithPermissions.isCancelled) { dispatch(AuthActions.setLoading(false)); }

      const currentUser = await AccessToken.getCurrentAccessToken();
      if (currentUser == null) { dispatch(AuthActions.setLoading(false)); }

      var result = await AuthService.loginAsFacebook({ token: currentUser?.accessToken });

      if (!result || !result.data) { dispatch(AuthActions.setLoading(false)); }

      console.log(result.data.data);
      dispatch(AuthActions.loginSuccess(result.data.data));
      return;
    } catch(err) {
      console.log('err', JSON.stringify(err));
    }
  }, []),

  loginAsTwitter: useCallback(async () => {
    try {
      dispatch(AuthActions.setLoading(true));
      await TwitterLogin.init(TWITTER_API_KEY, TWITTER_API_SECRET_KEY);
      const twitterLogin = await TwitterLogin.logIn();

      if (!twitterLogin || !twitterLogin.authToken) { dispatch(AuthActions.setLoading(false)); }

      var result = await AuthService.loginAsTwitter({
        authToken: twitterLogin?.authToken,
        authTokenSecret: twitterLogin.authTokenSecret
      });

      if (!result || !result.data) { dispatch(AuthActions.setLoading(false)); }

      console.log(result.data.data);
      dispatch(AuthActions.setLoading(false));

    } catch(err) {
      console.log('err', JSON.stringify(err));
    }
  }, []),
});
