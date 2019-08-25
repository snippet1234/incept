import React from 'react'
//import ReactNative from 'react-native'
import { Layout, Text, Button, Input, Avatar } from 'react-native-ui-kitten';
import { NavigationScreenProps } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { LOGO_IMAGE } from '../constants/images';
import { PALETTE } from '../constants/colors';
import { Message } from '../util/message';


interface ILoginState {
  formData: { email: string; password: string };
  loading: boolean;
}

class ResetPasswordNavigator extends React.Component<
  NavigationScreenProps,
  ILoginState
  >{

  state: ILoginState = {
    formData: { email: '', password: '' },
    loading: false
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
          Reset your password
        </Text>
        <Input
          placeholder="Email"
          label="Email"
          autoCapitalize="none"
          value={formData.email}
          icon={() => (
            <Avatar
              shape="round"
              size="small"
              source={require('../assets/icons/eva/person.png')}
            />
          )}
          onChangeText={value => this.onInputValueChange('email', value)}
        />
        <Button style={styles.submitButton}
          onPress={() => {
            Message.show('Reset password email has been sent.', 'success')
          }}
        >
          Reset password
        </Button>
      </Layout>

    )
  }
}

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
  submitButton: {
    width: '100%',
    marginTop: 15,
    borderColor: 'transparent',
    backgroundColor: PALETTE.primary
  }
})

export default ResetPasswordNavigator




