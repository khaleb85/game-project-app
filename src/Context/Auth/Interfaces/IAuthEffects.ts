import { FormikHelpers, FormikValues } from "formik";

export interface IAuthEffects {
  login: (email: string, pass: string, helpers: FormikHelpers<FormikValues>) => void;
  loginAsGoogle: () => void;
  loginAsFacebook: () => void;
  loginAsTwitter: () => void;
}