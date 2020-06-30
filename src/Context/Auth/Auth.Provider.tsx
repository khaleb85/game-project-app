import React, { useState, useCallback, FC } from 'react';
import AuthContext from './Auth.Context';
import { IAuth } from './Interfaces/IAuth';

const AuthProvider: FC<IAuth> = ({ children }) => {
  const [ isLogged, setIsLogged ] = useState<boolean>(false);

  const login = useCallback(async () => {
    
  }, []);

  return <AuthContext.Provider value={{ isLogged }}>{children}</AuthContext.Provider>
}

export default AuthProvider;
