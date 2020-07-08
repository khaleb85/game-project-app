import * as Yup from 'yup';
import { translate } from '../../Utils/Locales';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email(translate('invalidEmail')).required(translate('emailRequired')),
  password: Yup.string().required(translate('passwordRequired')),
});

export default LoginSchema;
