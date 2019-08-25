import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { View, SafeAreaView, Image, RefreshControl } from 'react-native';
import { Text, Avatar, Layout, Input, Button } from '@kitten/ui';
import { PALETTE } from '../../constants/colors';
import { NavigationScreenOptions } from 'react-navigation';
import { API_URLS } from '../../constants/network';
import { Networker } from '../../util/networker';
import { Message } from '../../util/message';
import { extractErrorMessage } from '../../util/error';
import { ScrollView } from 'react-native-gesture-handler';

interface IUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  nmls: string;
  logo: string;
}
interface ProfileState {
  user: IUser;
  loading: boolean;
}

class ProfileScreenView extends Component<NavigationScreenProps, ProfileState> {
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

  state: ProfileState = {
    user: {
      name: 'xxx',
      email: 'xxx@xxx.com',
      nmls: '',
      address: '',
      logo: '',
      phone: 'xxxxxxxxxx'
    },
    loading: false
  };
  async componentDidMount() {}

  fetchProfile = async () => {
    this.setState({
      loading: true
    });
    try {
      const { data } = await Networker.get(API_URLS.PROFILE);
      this.setState({ user: data });
    } catch (err) {
      Message.show(extractErrorMessage(err), 'danger');
    }

    this.setState({
      loading: false
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <SafeAreaView>
        <ScrollView refreshControl={<RefreshControl refreshing={loading} />}>
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
              {user.name}
            </Text>
            <Input
              placeholder="Email"
              value={user.email}
              icon={() => (
                <Avatar
                  shape="round"
                  size="small"
                  source={require('../../assets/icons/eva/person.png')}
                />
              )}
            />
            <Input
              placeholder="Phone"
              value={user.phone}
              icon={() => (
                <Avatar
                  shape="round"
                  size="small"
                  source={require('../../assets/icons/eva/phone.png')}
                />
              )}
            />
            <Input
              placeholder="Address"
              value={user.address}
              icon={() => (
                <Avatar
                  shape="round"
                  size="small"
                  source={require('../../assets/icons/eva/map.png')}
                />
              )}
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
              Add Company Info
            </Button>
            <Button
              onPress={() => {
                Message.show('Profile Updated', 'success');
              }}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export const ProfileScreen = withNavigation(ProfileScreenView);
