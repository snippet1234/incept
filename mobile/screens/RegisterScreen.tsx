import * as React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Layout, Text, Button, Input, Avatar } from 'react-native-ui-kitten';
import { withNavigation, NavigationScreenProps } from 'react-navigation';

import validate from 'validate.js';
import { LOGIN_CONSTRAINS } from './auth/login/contraints';
import { PALETTE } from '../constants/colors';
import { LOGO_IMAGE } from '../constants/images';

interface ILoginState {
  formData: { email: string; password: string };
  loading: boolean;
}

class RegisterScreenView extends React.Component<
  NavigationScreenProps,
  ILoginState
> {
  state: ILoginState = {
    formData: { email: '', password: '' },
    loading: false
  };

  onSubmit = () => {
    const { formData } = this.state;
    this.props.navigation.navigate('Forms');
    const errors = validate(formData, LOGIN_CONSTRAINS);
    console.warn(errors);
  };

  private onInputValueChange = (key: string, value: string) => {
    const { formData } = this.state;
    formData[key] = value;
    this.setState({ formData });
  };

  render() {
    const { formData } = this.state;
    return (
      <>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={{
            marginTop: 40,
            marginLeft: 20
          }}
        >
          <Avatar
            shape="round"
            size="small"
            source={require('../assets/icons/eva/arrow-ios-back.png')}
          />
        </TouchableOpacity>
        <Layout style={styles.container}>
          <Avatar
            shape="round"
            style={{ height: 150, width: 150, marginTop: 15 }}
            size="giant"
            source={LOGO_IMAGE.DARK}
          />
          <Text style={{ marginBottom: 40 }} category="h4">
            Register
          </Text>
          <Input
            placeholder="User Name"
            label="User Name"
            value={formData.email}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../assets/icons/eva/person.png')}
              />
            )}
            onChangeText={value => this.onInputValueChange('username', value)}
          />
          <Input
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
          <Input
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
        </Layout>
      </>
    );
  }
}

export const RegisterScreen = withNavigation(RegisterScreenView);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: '20%'
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
