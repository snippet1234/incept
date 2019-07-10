import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { View } from 'react-native';
import { Text } from 'react-native-ui-kitten';

class ProfileScreenView extends Component<NavigationScreenProps> {
  render() {
    return (
      <View>
        <Text>Profile here</Text>
      </View>
    );
  }
}

export const ProfileScreen = withNavigation(ProfileScreenView);
