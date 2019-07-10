import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';

class SubscriptionScreenView extends Component<NavigationScreenProps> {
  render() {
    return <div />;
  }
}

export const SubscriptionScreen = withNavigation(SubscriptionScreenView);
