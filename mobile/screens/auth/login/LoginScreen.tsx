import * as React from 'react';
import { StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Layout, Text, Button, Input, Avatar } from 'react-native-ui-kitten';
import { withNavigation, NavigationScreenProps, ScrollView } from 'react-navigation';

import { PALETTE } from '../../../constants/Colors';
const validate = require('validate.js');
import { LOGIN_CONSTRAINS } from './contraints';
import { LOGO_IMAGE } from '../../../constants/Images';
import { CustomInput } from '../../../components/CustomInput';
import { Networker } from '../../../util/networker';
import { API_URLS } from '../../../constants/network';
import { Storage } from '../../../util/storage';
import { isLoggedIn } from '../../../util/auth';
import { ClientData } from 'types/auth';
import { MessageDuration, Message } from '../../../util/message';
import { CustomButton } from '../../../components/CustomButton';

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
    formData: { email: 'user@mail.com', password: 'secret' },
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
    const { data } = await Networker.get<ClientData>(API_URLS.CLIENT);

    Message.show(JSON.stringify(data), 'success', MessageDuration.LONG);
    await Storage.setClient(data);
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
    const { data } = await Networker.post(API_URLS.LOGIN, {
      password: formData.password,
      username: formData.email,
      client_id,
      client_secret: secret,
      grant_type: 'password'
    });

    console.warn(data);
    await Storage.setAuth(data);
    this.setState({ loading: false });
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
    const { formData, errors, loading } = this.state;
    return (
      <ScrollView>
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
        <CustomInput
          placeholder="Email"
          error={errors['email'] && errors['email'][0]}
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
        <CustomInput
          placeholder="Password"
          label="Password"
          error={errors['password'] && errors['password'][0]}
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
      </ScrollView>
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
