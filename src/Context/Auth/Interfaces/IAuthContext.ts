import { IAuthEffects } from "./IAuthEffects";

export interface IAuthContext {
  isLogged: boolean;
  isLoading: boolean;
  errorMessage?: string[];

  effects?: IAuthEffects;
}
