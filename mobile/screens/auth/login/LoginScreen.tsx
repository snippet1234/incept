import * as React from 'react';
import { StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Layout, Text, Button, Input, Avatar } from 'react-native-ui-kitten';
import { withNavigation, NavigationScreenProps, ScrollView, SafeAreaView } from 'react-navigation';

import { PALETTE } from '../../../constants/colors';
const validate = require('validate.js');
import { LOGIN_CONSTRAINS } from './contraints';
import { LOGO_IMAGE } from '../../../constants/images';
import { Networker } from '../../../util/networker';
import { API_URLS } from '../../../constants/network';
import { Storage } from '../../../util/storage';
import { isLoggedIn } from '../../../util/auth';
import { ClientData } from 'types/auth';
import { MessageDuration, Message } from '../../../util/message';
import { CustomButton } from '../../../components/CustomButton';
import { ValidationInput } from '../../../components/common';
import { extractErrorMessage } from '../../../util/error';

import { Platform } from '@unimodules/core';

interface ILoginState {
  formData: { email: string; password: string };
  loading: boolean;
  errors: { [index: string]: string[] }[];
}

class LoginScreenView extends React.Component<
  NavigationScreenProps,
  ILoginState
  > {
  state: ILoginState = {
    formData: { email: '', password: '' },
    loading: false,
    errors: []
  };

  async componentDidMount() {
    if (await isLoggedIn()) {
      this.props.navigation.navigate('Main');
      return;
    }
    await this.loadNetworkDetails();
  }

  async loadNetworkDetails() {
    try {
      const { data } = await Networker.get<ClientData>(API_URLS.CLIENT);

      Message.show('Network check passed.', 'success', MessageDuration.LONG);
      await Storage.setClient(data);

    } catch (err) {
      console.warn(err);
      Message.show(extractErrorMessage(err), 'danger');
    }
  }

  onSubmit = async () => {
    const { formData } = this.state;
    console.warn(formData);
    this.setState({ loading: true });
    const errors = validate(formData, LOGIN_CONSTRAINS);
    if (errors) {
      this.setState({ errors });
      console.warn(errors);
      return;
    }

    const { client_id, secret } = await Storage.getClient();
    try {
      const { data } = await Networker.post(API_URLS.LOGIN, {
        password: formData.password,
        username: formData.email,
        client_id,
        client_secret: secret,
        grant_type: 'password'
      });


      await Storage.setAuth(data);
      this.setState({ loading: false });
      this.props.navigation.navigate('Main');

    } catch (err) {
      Message.show(extractErrorMessage(err), 'danger');
    }

  };

  onReset = () => {
    //const { formData } = this.state;
    //const errors = validate(formData, LOGIN_CONSTRAINS);
    this.props.navigation.navigate('Reset');
    // console.warn(errors);
  };

  private onInputValueChange = (key: string, value: string) => {
    const { formData } = this.state;
    formData[key] = value;
    this.setState({ formData });
  };

  isValid(key: string) {
    const { formData, loading } = this.state;
    const errors = validate(formData, LOGIN_CONSTRAINS);

    return !errors || errors[key];
  }
  render() {
    const { formData, errors, loading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : 'padding'}
            style={{ flex: 1 }}
          >
            <Layout style={styles.container}>
              <Avatar
                shape="round"
                style={{ height: 150, width: 150, marginTop: 15 }}
                size="giant"
                source={LOGO_IMAGE.DARK}
              />
              <Text style={styles.text} category="h4">
                Welcome to Loan Incept
        </Text>
              <ValidationInput
                placeholder="Email"
                validator={() => this.isValid('email')}
                // error={errors['email'] && errors['email'][0]}
                label="Email"
                autoCapitalize="none"
                value={formData.email}
                icon={() => (
                  <Avatar
                    shape="round"
                    size="small"
                    source={require('../../../assets/icons/eva/person.png')}
                  />
                )}
                onChangeText={value => this.onInputValueChange('email', value)}
              />
              <ValidationInput
                validator={() => this.isValid('password')}
                secureTextEntry
                placeholder="Password"
                label="Password"
                // error={errors['password'] && errors['password'][0]}
                labelStyle={{}}
                icon={() => (
                  <Avatar
                    shape="round"
                    size="small"
                    source={require('../../../assets/icons/eva/lock.png')}
                  />
                )}
                value={formData.password}
                onChangeText={value => this.onInputValueChange('password', value)}
              />
              <CustomButton
                disabled={loading}
                loading={loading}
                onPress={this.onSubmit}
                style={styles.loginButton}
                title="Login"
              />
              <Button onPress={this.onReset} style={styles.forgotButton}>
                Forgot Password?
        </Button>
              <Button
                onPress={() => this.props.navigation.navigate('Register')}
                status="success"
                style={styles.registerButton}
              >
                REGISTER
        </Button>
            </Layout>

          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export const LoginScreen = withNavigation(LoginScreenView);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: '5%'

  },
  text: {
    marginVertical: 16
  },
  forgotButton: {
    width: '100%',
    marginTop: 15,
    backgroundColor: PALETTE.primary,
    borderColor: 'transparent'
  },
  registerButton: {
    width: '100%',
    marginTop: 50,
    backgroundColor: PALETTE.primary,
    borderColor: PALETTE.primary,
  },
  loginButton: {
    width: '100%',
    marginTop: 15,
    borderColor: 'transparent',
    backgroundColor: PALETTE.primary
  }
});
