import React, { FC, createContext, useReducer } from 'react';
import { IAuth } from './Interfaces/IAuth';
import { IAuthContext } from './Interfaces/IAuthContext';
import { INITIAL_STATE, AuthReducers } from './Auth.Reducers';
import { AuthEffects } from './Auth.Effect';

const AuthContext = createContext<IAuthContext>(INITIAL_STATE);

const AuthProvider: FC<IAuth> = ({ children }) => {
  const [ state, dispatch ] = useReducer(AuthReducers, INITIAL_STATE);

  const effects = AuthEffects(dispatch);

  return <AuthContext.Provider value={{ ...state, ...effects }}>{children}</AuthContext.Provider>
}

export default AuthProvider;
