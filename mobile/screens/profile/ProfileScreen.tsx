import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { View, SafeAreaView, Image } from 'react-native';
import { Text, Avatar, Layout, Input, Button } from '@kitten/ui';
import { PALETTE } from '../../constants/Colors';
import { NavigationScreenOptions } from 'react-navigation';
class ProfileScreenView extends Component<NavigationScreenProps> {
  static defaultNavigationOptions: NavigationScreenOptions = {
    title: 'Details',
    headerTitle: 'Details',
    headerBackground: 'red',
    headerStyle: {
      backgroundColor: '#28F1A6',
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: '#333333',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    }
  };

  render() {
    return (
      <SafeAreaView>
        <Layout
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15
          }}
        >
          <Avatar
            style={{ width: 150, height: 150 }}
            size="large"
            source={{
              uri:
                'https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg'
            }}
          />
          <Text category="h3" style={{ margin: 10 }}>
            Nishant Z
          </Text>
          <Input
            placeholder="Email"
            value={undefined}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/person.png')}
              />
            )}
            onChangeText={value => this.onInputValueChange('email', value)}
          />
          <Input
            placeholder="Phone"
            value={undefined}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/phone.png')}
              />
            )}
            onChangeText={value => this.onInputValueChange('email', value)}
          />
          <Input
            placeholder="Address"
            value={undefined}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/map.png')}
              />
            )}
            onChangeText={value => this.onInputValueChange('email', value)}
          />
          <Input
            placeholder="DRE"
            value={undefined}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/arrowhead-up.png')}
              />
            )}
            onChangeText={value => this.onInputValueChange('email', value)}
          />
          <Input
            placeholder="NMLS"
            value={undefined}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/bulb.png')}
              />
            )}
            onChangeText={value => this.onInputValueChange('email', value)}
          />
          <Button
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/plus.png')}
              />
            )}
            style={{
              backgroundColor: PALETTE.primary,
              borderColor: PALETTE.primary,
              width: '100%',
              marginTop: 15
            }}
          >
            {' '}
            Add Company Info
          </Button>
          <Button
            style={{
              backgroundColor: PALETTE.primary,
              borderColor: PALETTE.primary,
              width: '100%',
              marginTop: 15
            }}
          >
            Save Profile
          </Button>
        </Layout>
      </SafeAreaView>
    );
  }
}

export const ProfileScreen = withNavigation(ProfileScreenView);
