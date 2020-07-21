import { createAction, Action, ActionsUnion } from '../../Utils/actionHelpers';
import { ILoginReponse } from 'src/Data/Interfaces/Responses/Auth/ILoginReponse';

export enum AuthActionKeys {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',

  SET_LOADING = 'SET_LOADING'
}

export const AuthActions = {
  loginSuccess: (data: ILoginReponse): LoginSuccessAction => createAction(AuthActionKeys.LOGIN_SUCCESS, data),
  loginError: (msg: string[]): LoginFailAction => createAction(AuthActionKeys.LOGIN_FAILED, msg),

  setLoading: (isLoading: boolean): StartLoadingAction => createAction(AuthActionKeys.SET_LOADING, isLoading),
}

export type AuthActionUnion = ActionsUnion<typeof AuthActions>;

export type LoginSuccessAction = Action<AuthActionKeys.LOGIN_SUCCESS, ILoginReponse>;
export type LoginFailAction = Action<AuthActionKeys.LOGIN_FAILED, string[]>;

export type StartLoadingAction = Action<AuthActionKeys.SET_LOADING, boolean>;
