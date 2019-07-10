import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';

class ContactScreenView extends Component<NavigationScreenProps> {
  render() {
    return <div />;
  }
}

export const ContactScreen = withNavigation(ContactScreenView);
