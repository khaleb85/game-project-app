import React, { FC } from 'react';
import LoginSchema from './Login.schema';
import { View, KeyboardAvoidingView } from 'react-native';
import { ImageOverlay, Input, Form } from '../../Components';
import { Button, Text, Icon, Spinner } from '@ui-kitten/components';
import { withAuthContext } from '../../Context/Auth';
import { AuthContext } from '../../Context/Auth/Auth.Provider';
import { translate } from '../../Utils/Locales';

import { styles } from './Login.style';
import { FormikHelpers, FormikValues } from 'formik';

const GoogleIcon = (props: any) => (
  <Icon {...props} name="google" />
);

const FaceBookIcon = (props: any) => (
  <Icon {...props} name="facebook" />
);

const TwitterIcon = (props: any) => (
  <Icon {...props} name="twitter" />
);

const initialValues = { email: '', password: '' };

const Login: FC = () => {
  const authContext = React.useContext(AuthContext)

  const submitHandler = (values: any, formikHelpers: FormikHelpers<FormikValues>) => {
    authContext.effects && authContext.effects.login(values.email, values.password, formikHelpers);
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
      <ImageOverlay
        style={styles.container}
        source={require('../../Static/img/background.jpg')}
      >
        <Form
          style={{ flex: 1 }}
          schema={LoginSchema}
          initialValues={initialValues}
          onSubmit={submitHandler}
        >
          {
            ({ handleSubmit }) => (
              <>
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
                    onPress={handleSubmit}
                  >
                    Sign Up
                  </Button>
                </View>
                <View style={styles.formContainer}>
                  <Input
                    name="email"
                    label={translate('email').toLocaleUpperCase()}
                    placeholder={translate('email')}
                    status='control'
                  />
                  <Input
                    name="password"
                    style={styles.passwordInput}
                    secureTextEntry={true}
                    placeholder={translate('password')}
                    label={translate('password').toLocaleUpperCase()}
                    status='control'
                  />
                  {
                    authContext.errorMessage
                    ? <View>
                        {
                          authContext.errorMessage.map((x, i) => (
                            <Text key={`error_message_${i}`} style={styles.errorMessage}>{x}</Text>
                          ))
                        }
                      </View>
                    : undefined
                  }
                </View>
                <Button
                  status='control'
                  size='large'
                  disabled={authContext.isLoading}
                  onPress={handleSubmit}
                  accessoryRight={() => (authContext.isLoading ? <Spinner status='info' /> : <></>)}
                >
                  {
                    authContext.isLoading
                    ? ''
                    : 'SIGN IN'
                  }
                </Button>
                <View style={styles.socialAuthContainer}>
              <Text
                style={styles.socialAuthHintText}
                status='control'
              >
                Sign with a social account
              </Text>
              <View style={styles.socialAuthButtonsContainer}>
                <Button
                  appearance='ghost'
                  size='giant'
                  status='control'
                  accessoryLeft={GoogleIcon}
                  disabled={authContext.isLoading}
                />
                <Button
                  appearance='ghost'
                  size='giant'
                  status='control'
                  accessoryLeft={FaceBookIcon}
                  disabled={authContext.isLoading}
                />
                <Button
                  appearance='ghost'
                  size='giant'
                  status='control'
                  accessoryLeft={TwitterIcon}
                  disabled={authContext.isLoading}
                />
              </View>
            </View>
              </>
            )
          }
        </Form>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
}

export default withAuthContext(Login);
