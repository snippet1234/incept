import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { Text, Layout } from 'react-native-ui-kitten';


class AboutScreenView extends Component<NavigationScreenProps> {
  render() {
    return <Layout style={{ justifyContent: 'center', margin: 50 }}>
      <Text category="h5">Hi there, We are incept!</Text>
    </Layout>;
  }
}

export const AboutScreen = withNavigation(AboutScreenView);
