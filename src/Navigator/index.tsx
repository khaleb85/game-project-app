import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Pages/Login';

export const AppNavigator: FC = () => (
  <NavigationContainer>
    <Login />
  </NavigationContainer>
);