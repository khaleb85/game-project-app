import { IAuthEffects } from "./IAuthEffects";

export interface IAuthContext {
  isLogged: boolean;
  isLoading: boolean;

  effects: IAuthEffects;
}
