import { createContext } from 'react';
import { IAuthContext } from './Interfaces/IAuthContext';

export default createContext<IAuthContext>({
  isLogged: false
});