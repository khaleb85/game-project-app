export interface IAuthEffects {
  login: (email: string, pass: string) => void
}