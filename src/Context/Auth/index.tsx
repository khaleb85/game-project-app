import React, { FC } from 'react';

import AuthProvider from './Auth.Provider';

export const withAuthContext = (WrappedComponent: FC<any>) => (props: any) => <AuthProvider><WrappedComponent {...props} /></AuthProvider>;