import React, { FC } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { ImageOverlay } from '../../Components';
import { Button, Input, Text, Icon } from '@ui-kitten/components';
import { withAuthContext } from '../../Context/Auth';
import { AuthContext } from '../../Context/Auth/Auth.Provider';

import { styles } from './Login.style';

const GoogleIcon = (props: any) => (
  <Icon {...props} name="google" />
);

const FaceBookIcon = (props: any) => (
  <Icon {...props} name="facebook" />
);

const TwitterIcon = (props: any) => (
  <Icon {...props} name="twitter" />
);

const Login: FC = () => {
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const authContext = React.useContext(AuthContext)

  const signInHandler = () => {
    authContext.effects.login(email, password);
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
      <ImageOverlay
        style={styles.container}
        source={require('../../Static/img/background.jpg')}>
        <View style={styles.signInContainer}>
          <Text
            style={styles.signInLabel}
            status='control'
            category='h4'>
            SIGN IN
          </Text>
          <Button
            style={styles.signUpButton}
            appearance='ghost'
            status='control'
            size='giant'
            // icon={ArrowForwardIcon}
            // onPress={onSignUpButtonPress}
          >
            Sign Up
          </Button>
        </View>
        <View style={styles.formContainer}>
          <Input
            label='EMAIL'
            placeholder='Email'
            status='control'
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            secureTextEntry={true}
            placeholder='Password'
            label='PASSWORD'
            status='control'
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button
          status='control'
          size='large'
          onPress={signInHandler}
        >
          SIGN IN
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text
            style={styles.socialAuthHintText}
            status='control'>
            Sign with a social account
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              accessoryLeft={GoogleIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              accessoryLeft={FaceBookIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              accessoryLeft={TwitterIcon}
            />
          </View>
        </View>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
}

export default withAuthContext(Login);
