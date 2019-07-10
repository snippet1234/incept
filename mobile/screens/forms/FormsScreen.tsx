import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';

class FormsScreenView extends Component<NavigationScreenProps> {
  render() {
    return <div />;
  }
}

export const FormsScreen = withNavigation(FormsScreenView);
