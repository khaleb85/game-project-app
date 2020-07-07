import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as theme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/Navigator';

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar barStyle="dark-content" hidden={true} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <SafeAreaView style={styles.fitToScreen}>
          <AppNavigator />
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  fitToScreen: {
    flex: 1
  }
});

export default App;
