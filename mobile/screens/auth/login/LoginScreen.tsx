import * as React from 'react';
import { StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Layout, Text, Button, Input, Avatar } from 'react-native-ui-kitten';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { PALETTE } from '../../../constants/Colors';
import validate from 'validate.js';
import { LOGIN_CONSTRAINS } from './contraints';
import { LOGO_IMAGE } from '../../../constants/Images';

interface ILoginState {
  formData: { email: string; password: string };
  loading: boolean;
}

class LoginScreenView extends React.Component<
  NavigationScreenProps,
  ILoginState
> {
  state: ILoginState = {
    formData: { email: '', password: '' },
    loading: false
  };

  onSubmit = () => {
    const { formData } = this.state;
    const errors = validate(formData, LOGIN_CONSTRAINS);
    this.props.navigation.navigate('Main');
    // console.warn(errors);
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

  render() {
    const { formData } = this.state;
    return (
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
        <Input
          placeholder="Email"
          label="Email"
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
        <Input
          placeholder="Password"
          label="Password"
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
        <Button onPress={this.onSubmit} style={styles.loginButton}>
          LOGIN
        </Button>
        <Button
          onPress={this.onReset}
          style={styles.forgotButton}
        >
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
    );
  }
}

export const LoginScreen = withNavigation(LoginScreenView);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: '35%'
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
