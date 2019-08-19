import React from 'react'
//import ReactNative from 'react-native'
import { Layout, Text, Button, Input, Avatar } from 'react-native-ui-kitten';
import { NavigationScreenProps } from 'react-navigation';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LOGO_IMAGE } from '../constants/Images';
import { PALETTE } from '../constants/Colors';


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
      <>
      <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={{
            marginTop: 40
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
        <Text style={styles.text} category="h4">
          Reset your password
        </Text>
        <Input
          placeholder="Email"
          label="Email"
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
          
        >
          Reset password
        </Button>
      </Layout>
    </>

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




