import { Platform } from '@unimodules/core';
import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Button, Layout, Text } from 'react-native-ui-kitten';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import validate from 'validate.js';

import { ValidationInput } from '../components/common';
import { PALETTE } from '../constants/colors';
import { LOGO_IMAGE } from '../constants/images';
import { API_URLS } from '../constants/network';
import { extractErrorMessage } from '../util/error';
import { Message } from '../util/message';
import { Networker } from '../util/networker';
import { REGISTER_CONSTRAINS } from './auth/login/contraints';


interface ILoginState {
  formData: { email: string; password: string; name: string };
  loading: boolean;
}

class RegisterScreenView extends React.Component<
  NavigationScreenProps,
  ILoginState
  > {
  state: ILoginState = {
    formData: { email: '', password: '', name: '' },
    loading: false
  };

  onSubmit = async () => {
    const { formData } = this.state;
    // this.props.navigation.navigate('Forms');
    try {
      const { data } = await Networker.post(API_URLS.REGISTER, formData);
      Message.show('Successfully registered. Please login.', 'success');

      this.props.navigation.navigate('Login');

    } catch (err) {
      Message.show(extractErrorMessage(err), 'danger');


    }
  };

  private onInputValueChange = (key: string, value: string) => {
    const { formData } = this.state;
    formData[key] = value;


    this.setState({ formData });
    // console.warn(this.state.formData);
  };

  isValid(key: string) {
    const { formData, loading } = this.state;
    const errors = validate(formData, REGISTER_CONSTRAINS);

    return !errors || !errors[key];
  }

  render() {
    const { formData } = this.state;
    return (
      <>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "position"}
              style={{ flex: 1 }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}
                style={{
                  marginTop: 20,
                  marginLeft: 10
                }}
              >
                <Avatar
                  shape="round"
                  size="small"
                  source={require('../assets/icons/eva/arrow-ios-back.png')}
                />
              </TouchableOpacity>
              <View style={{ alignItems: 'center' }}>

                <Avatar
                  shape="round"
                  style={{ height: 150, width: 150, marginTop: 15 }}
                  size="giant"
                  source={LOGO_IMAGE.DARK}
                />
                <Text style={{ marginBottom: 40 }} category="h4">
                  Register
          </Text>
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <ValidationInput
                  placeholder="name"
                  validator={() => this.isValid('name')}
                  label="User Name"
                  value={formData.name}

                  icon={() => (
                    <Avatar
                      shape="round"
                      size="small"
                      source={require('../assets/icons/eva/person.png')}
                    />
                  )}
                  onChangeText={value => {
                    this.onInputValueChange('name', value)
                  }}
                />
                <ValidationInput
                  validator={() => this.isValid('email')}
                  placeholder="Email"
                  label="Email"
                  value={formData.email}
                  icon={() => (
                    <Avatar
                      shape="round"
                      size="small"
                      source={require('../assets/icons/eva/email.png')}
                    />
                  )}
                  onChangeText={value => this.onInputValueChange('email', value)}
                />
                <ValidationInput
                  validator={() => this.isValid('phone')}
                  placeholder="Phone Number"
                  label="Phone Number"
                  labelStyle={{}}
                  icon={() => (
                    <Avatar
                      shape="round"
                      size="small"
                      source={require('../assets/icons/eva/phone.png')}
                    />
                  )}
                  value={formData.password}
                  onChangeText={value => this.onInputValueChange('phone', value)}
                />
                <ValidationInput
                  secureTextEntry
                  validator={() => this.isValid('password')}
                  placeholder="Password"
                  label="Password"
                  labelStyle={{}}
                  icon={() => (
                    <Avatar
                      shape="round"
                      size="small"
                      source={require('../assets/icons/eva/lock.png')}
                    />
                  )}
                  value={formData.password}
                  onChangeText={value => this.onInputValueChange('password', value)}
                />
                <Button onPress={this.onSubmit} style={styles.loginButton}>
                  REGISTER
          </Button>
              </View>


            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </>
    );
  }
}

export const RegisterScreen = withNavigation(RegisterScreenView);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    paddingTop: '10%'
  },
  text: {
    marginVertical: 16
  },
  forgotButton: {
    width: '100%',
    marginTop: 15,
    backgroundColor: PALETTE.tabIconDefault,
    borderColor: 'transparent'
  },
  registerButton: {
    width: '100%',
    marginTop: 120,
    backgroundColor: PALETTE.primary,
    borderColor: PALETTE.primary
  },
  loginButton: {
    width: '100%',
    marginTop: 15,
    borderColor: 'transparent',
    backgroundColor: PALETTE.primary
  }
});
