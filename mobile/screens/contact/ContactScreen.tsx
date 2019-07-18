import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { Text, Layout } from 'react-native-ui-kitten';

class ContactScreenView extends Component<NavigationScreenProps> {
  render() {
    return <Layout style={{ justifyContent: 'center', margin: 50 }}><Text category="h5">Say hello: hello@incept.com</Text></Layout>;
  }
}

export const ContactScreen = withNavigation(ContactScreenView);
