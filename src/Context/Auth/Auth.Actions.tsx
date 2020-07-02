import { createAction, Action, ActionsUnion } from '../../Utils/actionHelpers';
import { ILoginReponse } from 'src/Data/Interfaces/Responses/Auth/ILoginReponse';

export enum AuthActionKeys {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  START_LOADING = 'START_LOADING'
}

export const AuthActions = {
  loginSuccess: (data: ILoginReponse): LoginSuccessAction => createAction(AuthActionKeys.LOGIN_SUCCESS, data),
  startLoading: (isLoading: boolean): StartLoadingAction => createAction(AuthActionKeys.START_LOADING, isLoading),
}

export type AuthActionUnion = ActionsUnion<typeof AuthActions>;

export type LoginSuccessAction = Action<AuthActionKeys.LOGIN_SUCCESS, ILoginReponse>;
export type StartLoadingAction = Action<AuthActionKeys.START_LOADING, boolean>;
