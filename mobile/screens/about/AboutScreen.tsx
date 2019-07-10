import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';

class AboutScreenView extends Component<NavigationScreenProps> {
  render() {
    return <div />;
  }
}

export const AboutScreen = withNavigation(AboutScreenView);
